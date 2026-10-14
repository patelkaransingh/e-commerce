import { type NextRequest, NextResponse } from "next/server";
import { generateToken, hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User.model";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { name, email, password } = req;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, Email and Password are required!" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address!" },
        { status: 400 },
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long!" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
      permissions: newUser.permissions,
    });

    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          _id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          permissions: newUser.permissions,
          avatar: newUser.avatar,
        },
      },
      { status: 201 },
    );

    response.cookies.set(process.env.JWT_COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}
