import Event from "../models/CalendarEvent.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createEvent = async (req, res) => {
  const {
    title,
    description,
    startTime,
    endTime,
    hospitalId,
    serviceId,
    userId,
  } = req.body;
  console.log("FROM FRONTED");
  console.log(req.body);

  if (new Date(endTime) < new Date(startTime)) {
    return res
      .status(400)
      .json({ error: "End Time cannot be before Start Time" });
  }

  try {
    const overlappingEvent = await Event.findOne({
      $or: [
        {
          startTime: { $lte: endTime },
          endTime: { $gte: startTime },
        },
        {
          startTime: { $gte: startTime, $lte: endTime },
        },
        {
          endTime: { $gte: startTime, $lte: endTime },
        },
      ],
    });

    if (overlappingEvent) {
      return res
        .status(409)
        .json({ error: "This Time have Booked Check Another" });
    }

    const event = await Event.create({
      title,
      description,
      startTime,
      endTime,
      bookedHospital: hospitalId,
      bookedService: serviceId,
      patient: userId,
    });

    if (event) {
      return res.status(201).json({
        _id: event._id,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        bookedHospital: event.bookedHospital,
        bookedService: event.bookedService,
      });
    } else {
      return res.status(400).json({ error: "Event creationg Fails try Again" });
    }
  } catch (err) {
    res.status(400).json({ error: "Event creation failed" });
    console.log(err.message);
  }
};

const getBookedEvent = async (req, res) => {
  console.log(req.params);
  console.log("this is from frontEnd");
  const hospitalId = req.params.hospitalId;
  const serviceId = req.params.serviceId;
  console.log(hospitalId, serviceId);
  try {
    const bookedEvents = await Event.find({
      bookedHospital: hospitalId,
      bookedService: serviceId,
    });
    res.status(200).json(bookedEvents);
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res.status(500).json({ error: "Error fetching booked events." });
  }
};

const getHospitalBookedEvents = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const scheduledEvents = await Event.find({
      bookedHospital: hospitalId,
    })
      .populate("bookedService")
      .populate("patient");
    res.status(200).json(scheduledEvents);
  } catch (error) {
    console.error(error);
    res.status(400).json({ err: error });
  }
};
export { createEvent, getBookedEvent, getHospitalBookedEvents };
