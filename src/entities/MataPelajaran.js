import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";

export const MataPelajaran = sequelize.define("MataPelajaran", {
  nama_mapel: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  pengajarId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
});

User.hasOne(MataPelajaran, { foreignKey: "pengajarId" });
MataPelajaran.belongsTo(User, { foreignKey: "pengajarId" });