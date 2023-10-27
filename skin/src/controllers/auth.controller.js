import { createAccessToken } from "../lib/jwt.js";
import bcrypt from "bcryptjs";
import pool from "../db.js";


export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let query = `INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *`;
  // let query = `INSERT INTO users (email,password) VALUES ($1,$2)`;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const { rows } = await pool.query(query, [email, passwordHash]);
    if (!rows.length) {
      console.log("Usuario no registrado");
      return res.sendStatus(404);
    }
    console.log({ id: rows[0].id, email: rows[0].email });
    res.sendStatus(201);``
  } catch (error) {
    console.log({ error_db: error.detail });
    res.sendStatus(409);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let query = `SELECT * FROM users WHERE email = $1`;
  try {
    const { rows } = await pool.query(query, [email]);
    if (!rows.length) {
      console.log("Usuario no encontrado");
      return res.sendStatus(404);
    }
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      console.log("Autenticación incorrecta");
      return res.sendStatus(401);
    }
    const token = await createAccessToken({ id: rows[0].id });
    res.cookie("token", token);
    console.log({
      id: rows[0].id,
      email: rows[0].email,
      token: token,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log({ error_db: error.detail });
    return res.sendStatus(500);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};
