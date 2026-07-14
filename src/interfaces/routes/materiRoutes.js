import express from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as materiController from "../controllers/materiController.js";

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

router.post("/upload", upload.single("filePath"), materiController.uploadMateri);
router.get("/", materiController.getMateri);
router.get("/:id", materiController.getMateriById);
router.put("/:id", upload.single("filePath"), materiController.update);
router.delete("/:id", materiController.delete_);

export default router;