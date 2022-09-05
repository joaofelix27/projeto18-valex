import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
let databaseConfig;

if (process.env.MODE === "PROD") {
  databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };
} else {
  databaseConfig = {
    connectionString: process.env.DATABASE_URL,
  };
}

const connection = new Pool(databaseConfig);

export default connection;
