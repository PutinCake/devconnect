import { NextResponse } from "next/server";
import { createUser, getUserByLogin } from "@/lib/db/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // login 字段就是 email
    const existingUser = await getUserByLogin(email);
    if (existingUser) {
      return NextResponse.json({ message: "Login already in use" }, { status: 409 });
    }

    // The createUser function is responsible for hashing the password.
    const newUser = await createUser({
      login: email,
      password: password, // Pass the plain-text password directly.
    });

    return NextResponse.json(
      { message: "User created successfully", userId: newUser.id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in /api/auth/register:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
