import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { MataPelajaran } from "./MataPelajaran.js";

export const Materi = sequelize.define("Materi", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relasi 1 mata pelajaran memiliki banyak materi
Materi.belongsTo(MataPelajaran, { foreignKey: "mataPelajaranId" });
MataPelajaran.hasMany(Materi, { foreignKey: "mataPelajaranId" });
