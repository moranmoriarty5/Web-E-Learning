import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Materi } from "./Materi.js";
import { User } from "./User.js";

export const Tugas = sequelize.define("Tugas", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  siswaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relasi: 1 materi dapat memiliki banyak tugas
Tugas.belongsTo(Materi, { foreignKey: "materiId" });
Materi.hasMany(Tugas, { foreignKey: "materiId" });

// Relasi ke User (siswa)
Tugas.belongsTo(User, { foreignKey: "siswaId" });
User.hasMany(Tugas, { foreignKey: "siswaId" });
