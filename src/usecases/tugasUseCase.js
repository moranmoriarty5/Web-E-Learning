import { Tugas } from "../entities/Tugas.js";
import { Materi } from "../entities/Materi.js";
import { User } from "../entities/User.js";

export const submitTugas = async ({ judul, materiId, siswaId, filePath }) => {
  const materi = await Materi.findByPk(materiId);

  if (!materi) {
    throw new Error("Materi tidak ditemukan");
  }

  // Validasi extension file minimal sudah dilakukan di route, namun double-check
  return await Tugas.create({ judul, filePath, materiId, siswaId });
};

export const getTugasByMateri = async (materiId) => {
  return await Tugas.findAll({
    where: { materiId },
    include: [{ model: User, attributes: ["id", "nama", "email"] }],
  });
};
