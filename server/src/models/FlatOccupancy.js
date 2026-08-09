import mongoose from "mongoose";

const flatOccupancySchema = new mongoose.Schema(
  {
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
      index: true,
    },

    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    relationshipType: {
      type: String,
      enum: ["OWNER", "RESIDENT", "TENANT"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "ENDED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

flatOccupancySchema.index({
  societyId: 1,
  flatId: 1,
  userId: 1,
});

const FlatOccupancy = mongoose.model(
  "FlatOccupancy",
  flatOccupancySchema
);

export default FlatOccupancy;