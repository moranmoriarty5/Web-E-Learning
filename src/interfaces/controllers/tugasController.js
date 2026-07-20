import * as tugasUseCase from "../../usecases/tugasUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const submit = async (req, res) => {
  try {
    if (!req.file) {
      return error(res, "File tidak ditemukan", 400);
    }

    const { judul, materiId, siswaId } = req.body;

    if (!judul || !materiId || !siswaId) {
      return error(res, "Field judul, materiId, dan siswaId wajib diisi", 400);
    }

    const tugas = await tugasUseCase.submitTugas({
      judul,
      materiId,
      siswaId,
      filePath: `/uploads/tugas/${req.file.filename}`,
    });

    res
      .status(201)
      .json({
        status: "success",
        message: "Tugas berhasil dikumpulkan",
        data: tugas,
      });
  } catch (err) {
    error(res, err.message);
  }
};

export const listByMateri = async (req, res) => {
  try {
    const { materiId } = req.params;
    const list = await tugasUseCase.getTugasByMateri(materiId);
    success(res, list, "Daftar tugas berhasil diambil");
  } catch (err) {
    error(res, err.message);
  }
};

export const deleteSubmit = async (req, res) => {
  try {
    const materiId = req.params.materiId;

    const siswaId = req.user.id;

    await tugasUseCase.deleteTugas(materiId, siswaId);

    success(res, null, "Pengumpulan berhasil dihapus");
  } catch (err) {
    error(res, err.message);
  }
};
