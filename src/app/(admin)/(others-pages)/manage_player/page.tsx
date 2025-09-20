

// app/upload/page.tsx  (Next.js 13+ app router)
"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("/api/upload", formData);
    alert("File has been Uploaded!");
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2">Upload</button>
    </div>
  );
}


