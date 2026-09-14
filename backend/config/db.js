import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

pool.on("connect", () => {
  console.log("Connected to Neon Postgres database");
});

pool.on("error", (err) => {
  console.error("Unexpected database pool error : ", err);
});

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
