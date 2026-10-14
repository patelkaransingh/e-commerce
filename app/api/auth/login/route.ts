import { type NextRequest, NextResponse } from "next/server";
import { comparePassword, generateToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User.model";

function isLoginRequest(
  body: unknown,
): body is { email: unknown; password: unknown } {
  return (
    typeof body === "object" &&
    body !== null &&
    !Array.isArray(body) &&
    "email" in body &&
    "password" in body
  );
}

export async function POST(request: NextRequest) {
  try {
    let req: unknown;
    try {
      req = await request.json();
    } catch {
      return NextResponse.json(
        { message: "A valid JSON request body is required" },
        { status: 400 },
      );
    }

    if (!isLoginRequest(req)) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const { email, password } = req;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password!" },
        { status: 404 },
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password!" },
        { status: 401 },
      );
    }

    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });

    const cookieName = process.env.JWT_COOKIE_NAME;
    if (!cookieName) {
      throw new Error("JWT_COOKIE_NAME not defined!");
    }

    const response = NextResponse.json({
      message: "Login Success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        avatar: user.avatar,
      },
    });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
