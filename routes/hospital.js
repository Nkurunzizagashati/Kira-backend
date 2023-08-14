import express from "express";
import {
  getHospitalProfile,
  getHospitals,
  loginToHospital,
  registerHospital,
  updateHospitalProfile,
} from "../controllers/hospital.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), registerHospital);
router.get("/", getHospitals);
router.post("/auth", loginToHospital);
router
  .route("/profile/:token")
  .get(getHospitalProfile)
  .patch(updateHospitalProfile);

export default router;
