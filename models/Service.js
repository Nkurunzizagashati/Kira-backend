import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  description: {
    type: String,
  },
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
