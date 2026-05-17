import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export async function getAuthUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;

  return decoded;
}