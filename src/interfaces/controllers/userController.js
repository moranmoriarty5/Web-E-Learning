import * as userUseCase from "../../usecases/userUseCase.js";
import { success, error } from "../../shared/helpers/response.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userUseCase.getAllUsers(req.query.role);

    success(res, users, "Data user berhasil diambil");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const register = async (req, res) => {
  try {
    const user = await userUseCase.registerUser(req.body);

    success(res, user, "Registrasi berhasil");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const result = await userUseCase.loginUser(
      req.body.email,
      req.body.password,
    );

    success(res, result, "Login berhasil");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await userUseCase.getProfile(req.user.id);

    success(res, profile, "Profil berhasil diambil");
  } catch (err) {
    error(res, err.message, 404);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const result = await userUseCase.updateProfile({
      id: req.user.id,
      ...req.body,
    });

    success(res, result, "Profil berhasil diperbarui");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const user = await userUseCase.createUserByAdmin(req.body);

    success(res, user, "User baru berhasil dibuat oleh admin");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const result = await userUseCase.updateUserByAdmin({
      id: req.params.id,
      ...req.body,
    });

    success(res, result, "User berhasil diperbarui");
  } catch (err) {
    error(res, err.message, 400);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userUseCase.deleteUserById(req.params.id);

    success(res, null, "User berhasil dihapus");
  } catch (err) {
    error(res, err.message, 400);
  }
};
