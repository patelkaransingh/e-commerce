import { type NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/getAuthUser";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    return NextResponse.json(
      {
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
          avatar: user.avatar,
        },
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 },
    );
  }
}
