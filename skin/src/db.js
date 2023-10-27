import pg from "pg";
const { Pool } = pg;

import dotenv from "dotenv";
dotenv.config();


const pool = new Pool({
  user: process.env.PGUSER,
  password:process.env.PGPASSWORD ,
  host: process.env.PGHOST,
  port:process.env.PGPORT,
  database:process.env.PGDATABASE,
});

pool.connect((error) => {
  if (error) {
    console.log("Error al conectarse a la DB");
    throw error;
  }
  else{
    console.log('Conexion exitosa a la DB');
  }
});

export default pool;

