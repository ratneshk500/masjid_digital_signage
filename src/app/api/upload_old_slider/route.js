import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "-" + file.name;

  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ success: true, filename });
}
