import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User.js";

export const registerUser = async (data) => {
  const { nama, email, password, role } = data;
  const hashed = await bcrypt.hash(password, 10);
  return await User.create({ nama, email, password: hashed, role });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email tidak ditemukan");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password salah");

  // ✅ Buat JWT token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      nama: user.nama,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    user: {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
    },
  };
};

export const createUserByAdmin = async ({ nama, email, password, role }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email sudah digunakan");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ nama, email, password: hashed, role });
  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role,
  };
};

export const deleteUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  if (user.role === "admin") {
    throw new Error("Admin tidak boleh dihapus");
  }

  await user.destroy();

  return true;
};