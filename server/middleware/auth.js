import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = () => process.env.JWT_SECRET || "development-only-secret";

export function signUser(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, secret(), { expiresIn: "7d" });
}

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ message: "Authentication required." });
    const payload = jwt.verify(token, secret());
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "User not found." });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired session." });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "You do not have access to this area." });
    next();
  };
}

export function publicUser(user) {
  const value = user.toObject ? user.toObject() : { ...user };
  if (value._id) {
    value.id = value._id.toString();
    delete value._id;
  }
  delete value.passwordHash;
  delete value.__v;
  return value;
}
