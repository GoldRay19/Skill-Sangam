import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["student", "employer", "admin"], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    college: String,
    bio: String,
    skills: { type: [String], default: [] },
    github: String,
    companyName: String,
    website: String,
    linkedin: String,
    verificationStatus: { type: String, default: "unverified" },
    registrationType: String,
    registrationNumber: String,
    proof: String,
    proofName: String,
    proofType: String,
    rejectionReason: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
