import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    studentId: mongoose.Schema.Types.ObjectId,
    employerId: mongoose.Schema.Types.ObjectId,
    internshipId: mongoose.Schema.Types.ObjectId,
    employer: String,
    internship: String,
    reason: String,
    details: String,
    status: { type: String, default: "Open" },
  },
  { timestamps: true },
);

export default mongoose.model("Report", reportSchema);
