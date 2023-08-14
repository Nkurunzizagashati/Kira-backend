import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/User.js";
import morgan from "morgan";
import mongoose from "mongoose";
import hospitalRoutes from "./routes/hospital.js";
import eventRoutes from "./routes/event.js";
dotenv.config();
import cors from "cors";
import serviceRouter from "./routes/service.js";

dotenv.config({ path: "./config.env" });

console.log(process.env.DATABASE);

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(morgan("dev"));
const port = process.env.PORT || 5000;
// CONNECTING TO THE DATABASE
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/services", serviceRouter);

app.use("/api/user", userRoute);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/events", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
