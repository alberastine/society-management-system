import express from "express";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  register,
  login,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: req.user,
  });
});

router.get(
  "/admin-test",
  protect,
  authorize("SUPER_ADMIN", "SOCIETY_ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "You have administrator access",
    });
  }
);

export default router;