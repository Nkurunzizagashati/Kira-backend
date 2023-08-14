import express from "express";
import {
  createEvent,
  getBookedEvent,
  getHospitalBookedEvents,
} from "../controllers/events.js";

// ======== CREATE EVENT ===========================

const router = express.Router();
router.get("/:hospitalId", getHospitalBookedEvents);
router.post("/create-event", createEvent);
router.get("/booked-events/:hospitalId/:serviceId", getBookedEvent);

export default router;
