import * as tugasUseCase from "../../usecases/tugasUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const submit = async (req, res) => {
  try {
    if (!req.file) {
      return error(res, "File tidak ditemukan", 400);
    }

    const { judul, materiId } = req.body;

    if (!judul || !materiId) {
      return error(res, "Field judul dan materiId wajib diisi", 400);
    }

    const tugas = await tugasUseCase.submitTugas({
      judul,
      materiId,
      siswaId: req.user.id,
      filePath: `/uploads/tugas/${req.file.filename}`,
    });

    success(res, tugas, "Tugas berhasil dikumpulkan", 201);
  } catch (err) {
    error(res, err.message, 400);
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
