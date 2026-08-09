import Society from "../models/Society.js";

export const getSocieties = async (req, res) => {
  try {
    let query = {};

    // SUPER_ADMIN can see every society.
    if (req.user.role !== "SUPER_ADMIN") {
      query = {
        _id: req.user.societyId,
        status: "ACTIVE",
      };
    }

    const societies = await Society.find(query).sort({
      createdAt: -1,
    });

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

export const createSociety = async (req, res) => {
  try {
    const {
      name,
      code,
      address,
      contactNumber,
      email,
    } = req.body;

    if (!name || !code || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, code, and address are required",
      });
    }

    const existingSociety = await Society.findOne({
      code: code.toUpperCase(),
    });

    if (existingSociety) {
      return res.status(409).json({
        success: false,
        message: "Society code already exists",
      });
    }

    const society = await Society.create({
      name,
      code: code.toUpperCase(),
      address,
      contactNumber,
      email,
      status: "ACTIVE",
    });

    res.status(201).json({
      success: true,
      message: "Society created successfully",
      data: society,
    });
  } catch (error) {
    console.error("Create society error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create society",
    });
  }
};

export const getSocietyById = async (req, res) => {
  try {
    const { id } = req.params;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Tenant isolation check.
    if (
      req.user.role !== "SUPER_ADMIN" &&
      society._id.toString() !== req.user.societyId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this society",
      });
    }

    res.status(200).json({
      success: true,
      data: society,
    });
  } catch (error) {
    console.error("Get society error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch society",
    });
  }
};

export const updateSociety = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      address,
      contactNumber,
      email,
    } = req.body;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Only SUPER_ADMIN can update any society.
    // SOCIETY_ADMIN can update their own society.
    if (
      req.user.role !== "SUPER_ADMIN" &&
      (
        req.user.role !== "SOCIETY_ADMIN" ||
        society._id.toString() !== req.user.societyId.toString()
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to update this society",
      });
    }

    if (name !== undefined) {
      society.name = name;
    }

    if (address !== undefined) {
      society.address = address;
    }

    if (contactNumber !== undefined) {
      society.contactNumber = contactNumber;
    }

    if (email !== undefined) {
      society.email = email.toLowerCase();
    }

    await society.save();

    res.status(200).json({
      success: true,
      message: "Society updated successfully",
      data: society,
    });
  } catch (error) {
    console.error("Update society error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update society",
    });
  }
};

export const deactivateSociety = async (req, res) => {
  try {
    const { id } = req.params;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    if (society.status === "INACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Society is already inactive",
      });
    }

    society.status = "INACTIVE";

    await society.save();

    res.status(200).json({
      success: true,
      message: "Society deactivated successfully",
      data: society,
    });
  } catch (error) {
    console.error("Deactivate society error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate society",
    });
  }
};

export const activateSociety = async (req, res) => {
  try {
    const { id } = req.params;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    if (society.status === "ACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Society is already active",
      });
    }

    society.status = "ACTIVE";

    await society.save();

    res.status(200).json({
      success: true,
      message: "Society activated successfully",
      data: society,
    });
  } catch (error) {
    console.error("Activate society error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to activate society",
    });
  }
};