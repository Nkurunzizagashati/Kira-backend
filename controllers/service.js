import Hospital from "../models/Hospital.js";
import Service from "../models/Service.js";

const createService = async (req, res) => {
  const { name, description, hospital_id } = req.body;
  console.log(req.body);

  try {
    const service = await Service.create({ name, description, hospital_id });
    const hospital = await Hospital.findById(hospital_id);
    hospital.services.push(service._id);
    await hospital.save();
    res.status(201).json({ message: "Service created successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
};

export { createService };
