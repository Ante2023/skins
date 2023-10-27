import { log } from "console";
import pool from "../db.js";
import fs from "fs";

export const createSkins = async (req, res) => {
  const { id_skin } = req.body;
  
  // let query = `INSERT INTO skins (nombre,tipo,precio,color) VALUES ($1,$2,$3,$4) RETURNING *`;
  let query = `INSERT INTO user_skin (id_user,id_skin) VALUES ($1,$2) RETURNING *`;
  try {
    const catidadSkin = await validarSkin(id_skin)
    if(!catidadSkin) {
      console.log("El skin no existe !!!");
      return res.sendStatus(400)
    }
    const { rows } = await pool.query(query, [req.user.id,id_skin]);
    if (!rows.length)
      return res.status(422).json({ message: "No se pudo insertar datos" });
    console.log(rows);
    return res.sendStatus(201);
  } catch (error) {
    console.log({ error: error.detail });
    return res.sendStatus(401);
  }
};

export const getSkins = async (req, res) => {
  let query = `SELECT * FROM skins`;
  try {
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.log({ error });
    return res.sendStatus(500);
  }
};

export const getMyskins = async (req, res) => {
  let query = `
  SELECT u.id as id_user,u.email,s.nombre as skin,s.tipo,s.precio,s.color
  FROM users u
  INNER JOIN user_skin us
    ON u.id = us.id_user 
  INNER JOIN  skins s
    ON s.id = us.id_skin
  WHERE u.id=$1`;
  try {
    const { rows } = await pool.query(query, [req.user.id]);
    console.log(req.user.id);
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateMySkins = async (req, res) => {
  const idUser = req.user.id;

  const { id, color } = req.params;
  let query = `UPDATE skins
  SET color = $1
  WHERE id IN (
    SELECT s.id
    FROM users u
    INNER JOIN user_skin us ON u.id = us.id_user
    INNER JOIN skins s ON s.id = us.id_skin
    WHERE us.id_skin = $2 AND us.id_user = $3) RETURNING *`;
  try {
    const { rows } = await pool.query(query, [color, id, req.user.id]);
    if (!rows.length) {
      console.log("Error al cambiar de color al skin");
      return res.sendStatus(422);
    }
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteMySkins = async (req, res) => {
  const { id } = req.params;
  try {
    const catidadSkin = await validarMiSkin(req.user.id, id);
    if (!catidadSkin) {
      console.log("No soy propietario de este skin");
      return res.sendStatus(403);
    }
    let query = `DELETE FROM skins WHERE id=$1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    if (!rows.length) {
      console.log("skin no encontrado");
      return res.sendStatus(404);
    }
    res.status(200).json(rows);
  } catch (error) {
    console.log({ error });
    return res.sendStatus(500);
  }
};

export const getSkinById = async (req, res) => {
  const { id } = req.params;
  let query = `SELECT * FROM skins WHERE id =$1 `;
  try {
    const { rows } = await pool.query(query, [id]);
    if (!rows.length) {
      console.log("Skin no encontrada");
      return res.sendStatus(404);
    }
    res.status(200).json(rows);
  } catch (error) {
    console.log({ error });
    return res.sendStatus(500);
  }
};

export const readJson = async (req, res) => {
  try {
    let rawdata = fs.readFileSync("src/dbSkins.json");
    let skins = JSON.parse(rawdata);
    res.status(200).json(skins );
  } catch (error) {
    res.sendStatus(404);
  }
};

const validarMiSkin = async (idUser, id) => {
  try {
    let query = `SELECT COUNT(*)
    FROM users u
    INNER JOIN user_skin us
      ON u.id = us.id_user
    INNE JOIN skins s
      ON s.id = us.id_skin
    WHERE us.id_skin =$1 AND us.id_user =$2`;
    const { rows } = await pool.query(query, [id, idUser]);
    return +rows[0].count;
  } catch (error) {
    console.log(`Error al validar mis skins :${error}`);
    return 0;
  }
};

const validarSkin = async (id) => {
  try {
    let query = `SELECT COUNT(*)
    FROM skins s
    WHERE s.id=$1`;
    const { rows } = await pool.query(query, [id]);
    return +rows[0].count;
  } catch (error) {
    console.log(`Error al validar mis skins :${error}`);
    return 0;
  }
};
