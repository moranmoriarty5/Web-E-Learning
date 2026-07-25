import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import userRoutes from "./interfaces/routes/userRoutes.js";
import mataPelajaranRoutes from "./interfaces/routes/mataPelajaranRoutes.js";
import materiRoutes from "./interfaces/routes/materiRoutes.js";
import diskusiRoutes from "./interfaces/routes/diskusiRoutes.js";
import tugasRoutes from "./interfaces/routes/tugasRoutes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();
const app = express();
app.disable("x-powered-by");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/users", userRoutes);
app.use("/api/mata-pelajaran", mataPelajaranRoutes);
app.use("/api/materi", materiRoutes);
app.use("/api/tugas", tugasRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/diskusi", diskusiRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/edit-profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/edit-profile.html"));
});

app.get("/dashboard-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard-admin.html"));
});

app.get("/mata-pelajaran", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/mata-pelajaran.html"));
});

app.get("/dashboard-pengajar", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard-pengajar.html"));
});

app.get("/materi", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/materi.html"));
});

app.get("/tugas-pengajar", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/tugas-pengajar.html"));
});

app.get("/dashboard-siswa", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard-siswa.html"));
});

app.get("/tugas", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/tugas.html"));
});

app.get("/diskusi", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/diskusi.html"));
});

try {
  await sequelize.sync();

  app.listen(process.env.PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${process.env.PORT}`);
  });
} catch (err) {
  console.error("❌ Gagal koneksi database:", err);
}
