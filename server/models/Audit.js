import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  { action: String, target: String, actor: String, reason: String },
  { timestamps: true },
);

export default mongoose.model("Audit", auditSchema);
