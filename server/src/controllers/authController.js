import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Society from "../models/Society.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const {
      societyId,
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      role,
    } = req.body;

    if (
      !societyId ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const society = await Society.findById(societyId);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      societyId,
      firstName,
      lastName,
      email: email.toLowerCase(),
      mobileNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        societyId: user.societyId,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "User account is not active",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          societyId: user.societyId,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};