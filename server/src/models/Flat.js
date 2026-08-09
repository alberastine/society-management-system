import mongoose from "mongoose";

const flatSchema = new mongoose.Schema(
  {
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
      index: true,
    },

    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
      index: true,
    },

    wingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wing",
      required: true,
      index: true,
    },

    unitNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    floorNumber: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["1BHK", "2BHK", "3BHK", "4BHK", "OTHER"],
      default: "OTHER",
    },

    status: {
      type: String,
      enum: ["OCCUPIED", "VACANT", "INACTIVE"],
      default: "VACANT",
    },
  },
  {
    timestamps: true,
  }
);

flatSchema.index(
  { societyId: 1, wingId: 1, unitNumber: 1 },
  { unique: true }
);

const Flat = mongoose.model("Flat", flatSchema);

export default Flat;