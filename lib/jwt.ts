import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  role: string;
}

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};