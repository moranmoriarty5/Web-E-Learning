import express from "express";
import * as mataPelajaranController from "../controllers/mataPelajaranController.js";

const router = express.Router();

router.get("/", mataPelajaranController.getAll);

// endpoint mapel berdasarkan pengajar
router.get(
  "/pengajar/:userId",
  mataPelajaranController.getByPengajar
);

router.post("/", mataPelajaranController.create);

router.put("/:id", mataPelajaranController.update);

export default router;