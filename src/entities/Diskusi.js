import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Materi } from "./Materi.js";

export const Diskusi = sequelize.define("Diskusi", {
  isi_pesan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// RELASI
User.hasMany(Diskusi, { foreignKey: "userId" });
Diskusi.belongsTo(User, { foreignKey: "userId" });

Materi.hasMany(Diskusi, { foreignKey: "materiId" });
Diskusi.belongsTo(Materi, { foreignKey: "materiId" });

// REPLY
Diskusi.hasMany(Diskusi, { foreignKey: "parent_id", as: "replies" });
Diskusi.belongsTo(Diskusi, { foreignKey: "parent_id", as: "parent" });
