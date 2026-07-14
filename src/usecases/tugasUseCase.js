import { Tugas } from "../entities/Tugas.js";
import { Materi } from "../entities/Materi.js";
import { User } from "../entities/User.js";
import fs from "node:fs";
import path from "node:path";

export const submitTugas = async ({ judul, materiId, siswaId, filePath }) => {
  const materi = await Materi.findByPk(materiId);

  if (!materi) {
    throw new Error("Materi tidak ditemukan");
  }

  const existing = await Tugas.findOne({
    where: {
        materiId,
        siswaId
    }
  });

  if (existing) {
    throw new Error("Anda sudah mengumpulkan tugas untuk materi ini.");
  }

  return await Tugas.create({ judul, filePath, materiId, siswaId });
};

export const getTugasByMateri = async (materiId) => {
  return await Tugas.findAll({
    where: { materiId },
    include: [{ model: User, attributes: ["id", "nama", "email"] }],
  });
};

export const deleteTugas = async (materiId, siswaId) => {

    const tugas = await Tugas.findOne({
        where: {
            materiId,
            siswaId
        }
    });

    if (!tugas) {
        throw new Error("Tugas tidak ditemukan");
    }

    if (tugas.filePath) {

        const filePath = path.join(
            process.cwd(),
            tugas.filePath.substring(1)
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

    }

    await tugas.destroy();

    return true;
}
