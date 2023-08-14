import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    bookedHospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookedService: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);
const Event = new mongoose.model("event", eventSchema);
export default Event;
