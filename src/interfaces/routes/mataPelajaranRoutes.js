import express from "express";
import * as mataPelajaranController from "../controllers/mataPelajaranController.js";
import { verifyToken, authorizeRoles } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, mataPelajaranController.getAll);

router.get("/me", verifyToken, authorizeRoles("pengajar"), mataPelajaranController.getMyMataPelajaran);

router.post("/", verifyToken, authorizeRoles("admin"), mataPelajaranController.create);

router.put("/:id", verifyToken,  mataPelajaranController.update);

export default router;
