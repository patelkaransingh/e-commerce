import Jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TJwtPayload } from "@/types";

export function generateToken(payload: TJwtPayload): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined!");
  }
  const token = Jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return token;
}

export function verifyToken(token: string): TJwtPayload | null {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined!");
  }

  try {
    return Jwt.verify(token, process.env.JWT_SECRET) as TJwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function hasPermission(user: TJwtPayload, permission: string): boolean {
  if (user.role == "superadmin") return true;

  return user.permissions.includes(permission as any);
}

export function isAdmin(user: TJwtPayload): boolean {
  return user.role == "admin" || user.role == "superadmin";
}
