import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
 if (req.method === "POST") {
  try {
   // const { email, password } = await req.json();
     const { email, password } = req.body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const db = await connectToDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // You can create JWT here if needed
    return NextResponse.json({ message: "Login successful", user: { email: user.email } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
}
