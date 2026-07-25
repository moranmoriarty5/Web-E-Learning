import express from "express";
import * as controller from "../controllers/diskusiController.js";
import { verifyToken } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.get("/:materiId", verifyToken, controller.getByMateri);

router.post("/", verifyToken, controller.create);

router.put("/:id", verifyToken, controller.update);

router.delete("/:id", verifyToken, controller.remove);

export default router;
