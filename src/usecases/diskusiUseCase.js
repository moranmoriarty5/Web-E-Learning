import { Diskusi } from "../entities/Diskusi.js";
import { User } from "../entities/User.js";

export const createDiskusi = async (
  materiId,
  userId,
  isi_pesan,
  parent_id = null
) => {
  return await Diskusi.create({
    materiId,
    userId,
    isi_pesan,
    parent_id
  });
};

export const getDiskusiByMateri = async (materiId) => {
  return await Diskusi.findAll({
    where: { materiId },
    include: [
      {
        model: User,
        attributes: ["nama", "role"]
      }
    ],
    order: [["createdAt", "ASC"]]
  });
};

export const deleteDiskusi = async (id, userId) => {
  const diskusi = await Diskusi.findByPk(id);
  if (!diskusi) throw new Error("Diskusi tidak ditemukan");
  if (diskusi.userId !== userId)
    throw new Error("Tidak punya akses");

  await diskusi.destroy();
};

export const updateDiskusi = async (id, userId, isi_pesan) => {
  const diskusi = await Diskusi.findByPk(id);
  if (!diskusi) throw new Error("Diskusi tidak ditemukan");
  if (diskusi.userId !== userId)
    throw new Error("Tidak punya akses");

  diskusi.isi_pesan = isi_pesan;
  await diskusi.save();
};

