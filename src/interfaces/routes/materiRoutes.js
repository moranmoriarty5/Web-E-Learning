import express from "express";
import multer from "multer";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as materiController from "../controllers/materiController.js";
import { verifyToken, authorizeRoles } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Di Vercel hanya /tmp yang bisa ditulis. Di komputer lokal tetap pakai folder uploads/materi.
const uploadDir = process.env.VERCEL
  ? path.join(os.tmpdir(), "uploads", "materi")
  : path.join(__dirname, "../../../uploads/materi");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post(
  "/upload",
  verifyToken,
  authorizeRoles("pengajar"),
  upload.single("filePath"),
  materiController.uploadMateri,
);

router.get("/mine", verifyToken, authorizeRoles("pengajar"), materiController.getMateriByPengajar);

router.get("/", verifyToken, materiController.getMateri);

router.get("/:id", verifyToken, materiController.getMateriById);

router.put("/:id", verifyToken, upload.single("filePath"), materiController.updateMateri);

router.delete("/:id", verifyToken, materiController.deleteMateri);

export default router;
