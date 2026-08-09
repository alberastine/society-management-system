import Society from "../models/Society.js";

export const getSocieties = async (req, res) => {
  try {
    const societies = await Society.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: societies.length,
      data: societies,
    });
  } catch (error) {
    console.error("Get societies error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch societies",
    });
  }
};