import societyRoutes from "./routes/societyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Society Management API is running",
  });
});

app.use("/api/societies", societyRoutes);
app.use("/api/auth", authRoutes);

export default app;