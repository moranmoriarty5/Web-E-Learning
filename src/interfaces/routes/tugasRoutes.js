import express from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as tugasController from "../controllers/tugasController.js";
import {
  verifyToken,
  authorizeRoles,
} from "../../shared/middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../uploads/tugas"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|ppt|pptx|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) return cb(null, true);
    cb(new Error("Format file tidak didukung"));
  },
});

router.get("/materi/:materiId", tugasController.listByMateri);

router.post(
  "/submit",
  verifyToken,
  authorizeRoles("siswa"),
  upload.single("file"),
  tugasController.submit
);

router.delete(
  "/submit/:materiId",
  verifyToken,
  authorizeRoles("siswa"),
  tugasController.deleteSubmit,
);

export default router;
