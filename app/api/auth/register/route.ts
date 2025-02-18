import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

// make a post request function
export async function POST(request: NextRequest) {
  try {
    // get email and password from the request
    const { email, password } = await request.json();
    // check if user provided both email and the password
    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password is required" },
        { status: 400 },
      );
    }

    // connect to database now
    await connectToDatabase();

    // check if user already exist

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exist with this email" },
        { status: 400 },
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { msg: "User Registered Successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error while registering the user" },
      { status: 500 },
    );
  }
}
