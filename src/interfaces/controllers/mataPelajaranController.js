import * as mataPelajaranUseCase from "../../usecases/mataPelajaranUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const getAll = async (req, res) => {
  try {
    const data = await mataPelajaranUseCase.getAllMataPelajaran();
    success(res, data, "Data mata pelajaran berhasil diambil");
  } catch (err) {
    error(res, err.message);
  }
};

export const getByPengajar = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await mataPelajaranUseCase.getMataPelajaranByPengajar(userId);
    success(res, data, "Data mata pelajaran pengajar berhasil diambil");
  } catch (err) {
    error(res, err.message);
  }
};

// Tambah mata pelajaran baru
export const create = async (req, res) => {
  try {
    const newPelajaran = await mataPelajaranUseCase.createMataPelajaran(req.body);
    success(res, newPelajaran, "Mata pelajaran berhasil ditambahkan");
  } catch (err) {
    error(res, err.message);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedPelajaran = await mataPelajaranUseCase.updateMataPelajaran(id, updatedData);
    success(res, updatedPelajaran, "Mata pelajaran berhasil diupdate");
  } catch (err) {
    error(res, err.message);
  }
};
