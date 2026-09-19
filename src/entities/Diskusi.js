import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Materi } from "./Materi.js";

export const Diskusi = sequelize.define("Diskusi", {
  isi_pesan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
  tableName: "diskusis",
},
);

User.hasMany(Diskusi, { foreignKey: "userId" });
Diskusi.belongsTo(User, { foreignKey: "userId" });

Materi.hasMany(Diskusi, { foreignKey: "materiId" });
Diskusi.belongsTo(Materi, { foreignKey: "materiId" });
