import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User.js";
import { MataPelajaran } from "../entities/MataPelajaran.js";
import { Tugas } from "../entities/Tugas.js";

export const getAllUsers = async (role) => {
  const whereClause = role ? { role } : {};

  const user = await User.findAll({
    where: whereClause,
    attributes: ["id", "nama", "email", "role"],
  });

  return user;
};

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

  // Buat JWT token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      nama: user.nama,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
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

export const getProfile = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ["id", "nama", "email", "role"],
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

export const updateProfile = async ({ id, nama, email, password }) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const emailExist = await User.findOne({
    where: {
      email,
    },
  });

  if (emailExist && emailExist.id != id) {
    throw new Error("Email sudah digunakan.");
  }

  if (nama && nama.trim() !== "") {
    user.nama = nama;
  }

  if (email && email.trim() !== "") {
    user.email = email;
  }

  if (password && password.trim() !== "") {
    if (password.length < 6) {
      throw new Error("Password minimal 6 karakter.");
    }
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role,
  };
};

export const createUserByAdmin = async ({ nama, email, password, role }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email sudah digunakan");

  if (password.length < 6) {
      throw new Error("Password minimal 6 karakter.");
    }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ nama, email, password: hashed, role });
  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role,
  };
};

export const updateUserByAdmin = async ({
  id,
  nama,
  email,
  password,
  role,
}) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  if (user.role === "admin") {
    throw new Error("Admin tidak boleh diubah.");
  }

  if (email && email !== user.email) {
    const existing = await User.findOne({
      where: { email },
    });

    if (existing && existing.id != id) {
      throw new Error("Email sudah digunakan");
    }
  }

  const updateData = {};

  if (nama) updateData.nama = nama;
  if (email) updateData.email = email;
  if (role) updateData.role = role;

  if (password && password.trim() !== "") {
    if (password.length < 6) {
      throw new Error("Password minimal 6 karakter.");
    }
    updateData.password = await bcrypt.hash(password, 10);
  } else {
    console.log("Password tidak diubah karena kosong atau hanya spasi.");
  }

  await user.update(updateData);

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

  const jumlahMapel = await MataPelajaran.count({
    where: {
      pengajarId: id,
    },
  });

  if (jumlahMapel > 0) {
    throw new Error(
      "Gagal menghapus user karena masih mengampu mata pelajaran.",
    );
  }

  const jumlahTugas = await Tugas.count({
    where: {
      siswaId: id,
    },
  });

  if (jumlahTugas > 0) {
    throw new Error("Gagal menghapus user karena masih memiliki tugas.");
  }

  await user.destroy();

  return {
    message: "User berhasil dihapus",
  };
};
