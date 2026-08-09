import express from "express";
import { getSocieties } from "../controllers/societyController.js";

const router = express.Router();

router.get("/", getSocieties);

export default router;