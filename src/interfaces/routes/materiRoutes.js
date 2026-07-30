import express from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as materiController from "../controllers/materiController.js";
import { verifyToken, authorizeRoles } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../uploads/materi"),
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

router.get("/", verifyToken, materiController.getMateri);

router.get("/:id", verifyToken, materiController.getMateriById);

router.put("/:id", verifyToken, upload.single("filePath"), materiController.updateMateri);

router.delete("/:id", verifyToken, materiController.deleteMateri);

export default router;
