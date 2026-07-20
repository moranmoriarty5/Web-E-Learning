import * as userUseCase from "../../usecases/userUseCase.js";
import { success, error } from "../../shared/helpers/response.js";
import { User } from "../../entities/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query; 

    const whereClause = role ? { role } : {}; 
    const users = await User.findAll({
      where: whereClause,
      attributes: ["id", "nama", "email", "role"],
    });

    success(res, users, "Data user berhasil diambil");
  } catch (err) {
    error(res, err.message);
  }
};

export const register = async (req, res) => {
  try {
    const user = await userUseCase.registerUser(req.body);
    success(res, user, "Registrasi berhasil");
  } catch (err) {
    error(res, err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userUseCase.loginUser(email, password);
    success(res, result, "Login berhasil");
  } catch (err) {
    error(res, err.message);
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    if (!nama || !email || !password || !role) {
      return error(res, "Semua field wajib diisi (nama, email, password, role)");
    }

    const newUser = await userUseCase.createUserByAdmin({
      nama,
      email,
      password,
      role,
    });

    success(res, newUser, "User baru berhasil dibuat oleh admin");
  } catch (err) {
    error(res, err.message);
  }
};

export const updateUserByAdmin = async (req, res) => {

    try {

        const result = await userUseCase.updateUserByAdmin({
            id: req.params.id,
            nama: req.body.nama,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        success(
            res,
            result,
            "User berhasil diperbarui oleh admin"
        );

    } catch (err) {

        error(res, err.message);

    }

};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userUseCase.deleteUserById(id);

    success(res, null, "User berhasil dihapus");
  } catch (err) {
    error(res, err.message);
  }
};