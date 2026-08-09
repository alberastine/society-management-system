import express from "express";

import {
  getSocieties,
  getSocietyById,
  createSociety,
  updateSociety,
  deactivateSociety,
  activateSociety,
} from "../controllers/societyController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireSocietyAccess } from "../middleware/tenantMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  requireSocietyAccess,
  getSocieties
);

router.get(
  "/:id",
  protect,
  requireSocietyAccess,
  getSocietyById
);

router.put(
  "/:id",
  protect,
  authorize("SUPER_ADMIN", "SOCIETY_ADMIN"),
  updateSociety
);

router.post(
  "/",
  protect,
  authorize("SUPER_ADMIN"),
  createSociety
);

router.delete(
  "/:id",
  protect,
  authorize("SUPER_ADMIN"),
  deactivateSociety
);

router.patch(
  "/:id/activate",
  protect,
  authorize("SUPER_ADMIN"),
  activateSociety
);

export default router;