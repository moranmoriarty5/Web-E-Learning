import * as materiUseCase from "../../usecases/materiUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const uploadMateri = async (req, res) => {
  try {
    if (!req.file) {
      return error(res, "File tidak ditemukan", 400);
    }

    const { judul, mataPelajaranId, userId } = req.body;
    const materi = await materiUseCase.uploadMateri({
      judul,
      mataPelajaranId,
      userId,
      filePath: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      status: "success",
      message: "Materi berhasil diupload",
      data: materi,
    });
  } catch (err) {
    error(res, err.message);
  }
};

export const getMateri = async (req, res) => {
  try {

    const materiList = await materiUseCase.getAllMateri();
    success(res, materiList, "Data materi berhasil diambil");

  } catch (err) {
    error(res, err.message);
  }
};

export const getMateriById = async (req, res) => {
  try {
    const { id } = req.params;
    const materi = await materiUseCase.getMateriById(id);
    if (!materi) return error(res, "Materi tidak ditemukan", 404);
    success(res, materi, "Data materi berhasil diambil");
  } catch (err) {
    error(res, err.message);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, userId } = req.body;

    if (!judul && !req.file) {
      return error(res, "Judul atau file harus diisi", 400);
    }

    if (!userId) {
      return error(res, "userId tidak ditemukan", 400);
    }

    const updateData = { judul };
    if (req.file) {
      updateData.filePath = `/uploads/${req.file.filename}`;
    }

    const updatedMateri = await materiUseCase.updateMateri(id, updateData, userId);
    success(res, updatedMateri, "Materi berhasil diupdate");
  } catch (err) {
    error(res, err.message);
  }
};

export const delete_ = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    if (!userId) {
      return error(res, "userId tidak ditemukan", 400);
    }

    const result = await materiUseCase.deleteMateri(id, userId);
    success(res, null, result.message);
  } catch (err) {
    error(res, err.message);
  }
};
