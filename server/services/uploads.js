import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";

const serverRoot = path.dirname(fileURLToPath(import.meta.url));
const uploadRoot = path.resolve(serverRoot, "../../uploads");

export async function saveProof({ data, filename, mimetype }) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "skillsangam/proofs", resource_type: "auto" },
        (error, value) => (error ? reject(error) : resolve(value)),
      );
      stream.end(data);
    });
    return { proof: result.secure_url, proofName: filename, proofType: mimetype };
  }

  await fs.mkdir(uploadRoot, { recursive: true });
  const safeName = `${crypto.randomUUID()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  await fs.writeFile(path.join(uploadRoot, safeName), data);
  const origin = process.env.SERVER_ORIGIN || `http://localhost:${process.env.PORT || 4000}`;
  return {
    proof: `${origin}/uploads/${safeName}`,
    proofName: filename,
    proofType: mimetype,
  };
}
