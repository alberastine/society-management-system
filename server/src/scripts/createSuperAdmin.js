import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "../config/database.js";
import User from "../models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await connectDB();

    const email = "superadmin@system.test";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("SUPER_ADMIN already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "SuperAdmin123!",
      12
    );

    const user = await User.create({
      societyId: null,
      firstName: "System",
      lastName: "Administrator",
      email,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    });

    console.log("SUPER_ADMIN created successfully.");
    console.log("Email:", user.email);
    console.log("Password: SuperAdmin123!");

    process.exit(0);
  } catch (error) {
    console.error("Failed to create SUPER_ADMIN:", error);
    process.exit(1);
  }
};

createSuperAdmin();