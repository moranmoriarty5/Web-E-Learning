import dotenv from "dotenv";
import app from "./app.js";
import { sequelize } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

try {
  await sequelize.authenticate();
  console.log("Database berhasil terhubung.");

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Gagal koneksi database:", err);
  process.exit(1);
}