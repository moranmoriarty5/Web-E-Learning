import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/admin/create", userController.createUserByAdmin);
router.delete("/:id", userController.deleteUser);

export default router;
