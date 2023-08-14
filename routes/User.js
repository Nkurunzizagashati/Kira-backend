import express from "express";
import { verifyToken } from "../verifyToken.js";
import { loginUser, registerUser, updateUser } from "../controllers/User.js";

// ======== USER REGISTRATION ===========================

const router = express.Router();
router.post("/register", registerUser);
// ========= USER LOGIN =======================

router.post("/login", loginUser);

// ================= UPDATE THE USER ==================

// router.put("/:id", verifyToken, updateUser);

export default router;
