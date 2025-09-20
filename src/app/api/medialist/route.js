import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs.readdirSync(uploadDir);

  // Add file type (image/video/other)
  const fileList = files.map((file) => {
    const ext = path.extname(file).toLowerCase();
    let type = "other";

    if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
      type = "image";
    } else if ([".mp4", ".webm", ".ogg"].includes(ext)) {
      type = "video";
    }

    return { src: file, type };
  });

  return NextResponse.json({ files: fileList });
}
