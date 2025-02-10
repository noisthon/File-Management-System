import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

export default User;
