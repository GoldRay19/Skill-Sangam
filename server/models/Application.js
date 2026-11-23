import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: true },
    note: String,
    status: { type: String, default: "Applied" },
  },
  { timestamps: true },
);

export default mongoose.model("Application", applicationSchema);
