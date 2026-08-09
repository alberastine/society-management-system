import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema(
  {
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    floors: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

buildingSchema.index(
  { societyId: 1, code: 1 },
  { unique: true }
);

const Building = mongoose.model("Building", buildingSchema);

export default Building;