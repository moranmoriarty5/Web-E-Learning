import * as materiUseCase from "../../usecases/materiUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const uploadMateri = async (req, res) => {
  try {
    if (!req.file) {
      return error(res, "File tidak ditemukan", 400);
    }

    const { judul, mataPelajaranId } = req.body;
    const materi = await materiUseCase.uploadMateri({
      judul,
      mataPelajaranId,
      userId: req.user.id,
      filePath: `/uploads/materi/${req.file.filename}`,
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

export const getMateriByPengajar = async (req, res) => {
  try {
    const materiList = await materiUseCase.getMateriByPengajar(req.user.id);
    success(res, materiList, "Data materi pengajar berhasil diambil");
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

export const updateMateri = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul } = req.body;

    if (!judul && !req.file) {
      return error(res, "Judul atau file harus diisi", 400);
    }

    const updateData = { judul };
    if (req.file) {
      updateData.filePath = `/uploads/materi/${req.file.filename}`;
    }

    const updatedMateri = await materiUseCase.updateMateri(
      id,
      updateData,
      req.user.id,
    );
    success(res, updatedMateri, "Materi berhasil diupdate");
  } catch (err) {
    error(res, err.message);
  }
};

export const deleteMateri = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await materiUseCase.deleteMateri(id, req.user.id);
    success(res, null, result.message);
  } catch (err) {
    error(res, err.message);
  }
};
