import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_SECRET_KEY as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function generateAccessToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}
