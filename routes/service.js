import express from "express";
import { createService } from "../controllers/service.js";

const router = express.Router();

router.post("/", createService);

export default router;
