import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env["DB_NAME"],
  process.env["DB_USERNAME"],
  process.env["DB_PASSWORD"],
  {
    host: process.env["DB_HOST"],
    port: process.env["DB_PORT"],
    dialect: "mysql",
  }
);

try {
  await sequelize.authenticate();
  console.log("Connected to database.");
} catch (error) {
  console.log("Unable to connect to database.");
}

export default sequelize;
