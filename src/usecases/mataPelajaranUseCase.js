import { MataPelajaran } from "../entities/MataPelajaran.js";
import { User } from "../entities/User.js";

export const getAllMataPelajaran = async () => {
  return await MataPelajaran.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "nama", "email"],
      },
    ],
  });
};

export const getMataPelajaranByPengajar = async (userId) => {
  return await MataPelajaran.findAll({
    where: { pengajarId: userId },
  });
};

export const createMataPelajaran = async ({
  nama_mapel,
  deskripsi,
  pengajarId,
}) => {
  if (!nama_mapel || !pengajarId) {
    throw new Error("Nama mata pelajaran dan pengajar wajib diisi");
  }

  const pengajar = await User.findOne({
    where: {
      id: pengajarId,
      role: "pengajar",
    },
  });

  if (!pengajar) {
    throw new Error("Pengajar tidak ditemukan");
  }

  const mapelExist = await MataPelajaran.findOne({
    where: { nama_mapel },
  });
  if (mapelExist) {
    throw new Error("Mata pelajaran sudah ada");
  }

  const pengajarExist = await MataPelajaran.findOne({
    where: { pengajarId },
  });
  if (pengajarExist) {
    throw new Error("Pengajar sudah memiliki mata pelajaran lain");
  }

  return await MataPelajaran.create({ nama_mapel, deskripsi, pengajarId });
};

export const updateMataPelajaran = async (
  id,
  { nama_mapel, deskripsi, pengajarId },
) => {
  const mapel = await MataPelajaran.findByPk(id);
  if (!mapel) {
    throw new Error("Mata pelajaran tidak ditemukan");
  }

  if (nama_mapel) {
    const duplicate = await MataPelajaran.findOne({
      where: { nama_mapel },
    });
    if (duplicate && duplicate.id !== mapel.id) {
      throw new Error("Nama mata pelajaran sudah digunakan");
    }
  }

  if (pengajarId) {
    const pengajar = await User.findOne({
      where: {
        id: pengajarId,
        role: "pengajar",
      },
    });
    if (!pengajar) {
      throw new Error("Pengajar baru tidak ditemukan");
    }

    const pengajarDipakai = await MataPelajaran.findOne({
      where: { pengajarId },
    });
    if (pengajarDipakai && pengajarDipakai.id !== mapel.id) {
      throw new Error("Pengajar sudah digunakan oleh mata pelajaran lain");
    }
  }

  await mapel.update({ nama_mapel, deskripsi, pengajarId });
  return mapel;
};
