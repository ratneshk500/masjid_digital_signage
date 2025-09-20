import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req) {
  const { filename } = await req.json();
  if (!filename) return NextResponse.json({ error: "Filename required" }, { status: 400 });

  const filePath = path.join(process.cwd(), "public/uploads", filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
