import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deliverables: { type: String, required: true },
    stipend: { type: Number, required: true },
    startDate: { type: String, required: true },
    openings: { type: Number, required: true },
    requiredSkills: { type: [String], default: [] },
    status: { type: String, default: "open" },
  },
  { timestamps: true },
);

export default mongoose.model("Internship", internshipSchema);
