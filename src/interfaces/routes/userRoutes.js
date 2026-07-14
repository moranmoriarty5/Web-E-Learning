import express from "express";
import * as userController from "../controllers/userController.js";
import {
  verifyToken,
  authorizeRoles
} from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  userController.getAllUsers
);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/admin/create",
  verifyToken,
  authorizeRoles("admin"),
  userController.createUserByAdmin
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  userController.deleteUser
);

export default router;