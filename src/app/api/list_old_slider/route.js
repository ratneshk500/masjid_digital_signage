import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs.readdirSync(uploadDir);
  return NextResponse.json({ files });
}
