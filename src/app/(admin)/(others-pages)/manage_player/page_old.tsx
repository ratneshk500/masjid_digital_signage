"use client";
import { useEffect, useState } from "react";

export default function FileManager() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const res = await fetch("/api/list");
    const data = await res.json();
    setFiles(data.files);
  };


  useEffect(() => {
    loadFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    loadFiles();
  };

  const handleDelete = async (filename) => {
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ filename }),
      headers: { "Content-Type": "application/json" },
    });
    loadFiles();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📂 Media Manager</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-6 flex items-center gap-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {/* Files List */}
      <div className="grid grid-cols-3 gap-4">
        {files.map((f, i) => {
          const isVideo = f.match(/\.(mp4|webm|ogg)$/i);
          const isImage = f.match(/\.(jpg|jpeg|png|gif|webp)$/i);

          return (
            <div
              key={i}
              className="border rounded shadow p-1 flex flex-col items-center"
            >
              
              {isImage ? (
                <img
                  src={`/uploads/${f}`}
                  width= "100%"  
                  height= "80%"  
                  alt={f}
                  className="max-h-40 object-contain mb-2"
                />
              ) : isVideo ? (
                <video
                  src={`/uploads/${f}`}
                  controls
                  className="max-h-40 object-contain mb-2"
                />
              ) : (
                <a
                  href={`/uploads/${f}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mb-2"
                >
                  {f}
                </a>
              )}
              
              <button
                onClick={() => handleDelete(f)}
                className="bg-red-500 text-white px-2 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
