import mongoose, { Document, Model, Schema } from "mongoose";

export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  QUALIFIED = "Qualified",
  LOST = "Lost",
}

export enum LeadSource {
  WEBSITE = "Website",
  INSTAGRAM = "Instagram",
  REFERRAL = "Referral",
}

export interface ILead extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Lead email is required"],
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: Object.values(LeadStatus),
        message: "Invalid lead status",
      },
      default: LeadStatus.NEW,
    },

    source: {
      type: String,
      enum: {
        values: Object.values(LeadSource),
        message: "Invalid lead source",
      },
      required: [true, "Lead source is required"],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", leadSchema);