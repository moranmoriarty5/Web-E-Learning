import { Materi } from "../entities/Materi.js";
import { MataPelajaran } from "../entities/MataPelajaran.js";

export const uploadMateri = async ({ judul, mataPelajaranId, userId, filePath }) => {
  const mapel = await MataPelajaran.findOne({
    where: {
      id: mataPelajaranId,
      pengajarId: userId,
    },
  });

  if (!mapel) {
    throw new Error("Anda hanya bisa upload materi ke mata pelajaran yang diampu");
  }

  return await Materi.create({
    judul,
    filePath,
    mataPelajaranId,
  });
};

export const getAllMateri = async () => {
  return await Materi.findAll({
    include: [{ model: MataPelajaran, attributes: ["nama_mapel", "pengajarId"] }],
  });
};

export const getMateriByMataPelajaran = async (mataPelajaranId) => {
  return await Materi.findAll({
    where: { mataPelajaranId },
    include: [{ model: MataPelajaran, attributes: ["nama_mapel"] }],
  });
};

export const getMateriById = async (materiId) => {
  return await Materi.findByPk(materiId, {
    include: [{ model: MataPelajaran, attributes: ["nama_mapel"] }],
  });
};

export const updateMateri = async (materiId, { judul, filePath }, userId) => {
  const materi = await Materi.findByPk(materiId, {
    include: [{ model: MataPelajaran }],
  });

  if (!materi) {
    throw new Error("Materi tidak ditemukan");
  }

  // Verify pengajar owns this materi
  if (materi.MataPelajaran.pengajarId !== Number.parseInt(userId)) {
    throw new Error("Anda tidak memiliki akses untuk mengubah materi ini");
  }

  const updateData = {};
  if (judul) updateData.judul = judul;
  if (filePath) updateData.filePath = filePath;

  return await materi.update(updateData);
};

export const deleteMateri = async (materiId, userId) => {
  const materi = await Materi.findByPk(materiId, {
    include: [{ model: MataPelajaran }],
  });

  if (!materi) {
    throw new Error("Materi tidak ditemukan");
  }

  // Verify pengajar owns this materi
  if (materi.MataPelajaran.pengajarId !== Number.parseInt(userId)) {
    throw new Error("Anda tidak memiliki akses untuk menghapus materi ini");
  }

  await materi.destroy();
  return { message: "Materi berhasil dihapus" };
};

