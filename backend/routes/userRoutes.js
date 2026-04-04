import express from "express";
import {
  authUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// ✅ LOGIN
router.post("/auth", authUser);

// ✅ REGISTER
router.post("/", registerUser);

export default router;