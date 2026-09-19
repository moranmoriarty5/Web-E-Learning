import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // || 5432,
    dialect: process.env.DB_DIALECT || "mysql",
    dialectModule: mysql2,
    // dialect: process.env.DB_DIALECT || "postgres",
  },
);
