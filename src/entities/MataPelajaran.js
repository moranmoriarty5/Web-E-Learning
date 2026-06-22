import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";

export const MataPelajaran = sequelize.define("MataPelajaran", {
  nama_mapel: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // nama mapel tidak boleh duplikat
  },

  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  pengajarId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true, // 1 pengajar hanya bisa punya 1 mapel
  },
});

User.hasOne(MataPelajaran, { foreignKey: "pengajarId" });
MataPelajaran.belongsTo(User, { foreignKey: "pengajarId" });