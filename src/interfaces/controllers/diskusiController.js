import * as DiskusiUseCase from "../../usecases/diskusiUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const getByMateri = async (req, res) => {
  try {
    const data = await DiskusiUseCase.getDiskusiByMateri(req.params.materiId, req.user.id);
    success(res, data, "Data diskusi berhasil diambil");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const create = async (req, res) => {
  try {
    const diskusi = await DiskusiUseCase.createDiskusi(
      req.body.materiId,
      req.user.id,
      req.body.isi_pesan,
      req.body.parent_id || null,
    );

    success(res, diskusi, "Komentar ditambahkan");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const update = async (req, res) => {
  try {
    await DiskusiUseCase.updateDiskusi(
      req.params.id,
      req.user.id,
      req.body.isi_pesan,
    );

    success(res, null, "Komentar diperbarui");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const remove = async (req, res) => {
  try {
    await DiskusiUseCase.deleteDiskusi(req.params.id, req.user.id);

    success(res, null, "Komentar dihapus");
  } catch (err) {
    error(res, err.message, 400);
  }
};
