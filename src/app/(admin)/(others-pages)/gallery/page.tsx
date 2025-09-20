// app/gallery/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  
   
  
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/upload").then((res) => setMedia(res.data));
  }, []);

  return (
   <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📂 Gallery</h1>
    <div className="grid grid-cols-3 gap-4 p-4">
      {media.map((item) => (
        <div key={item._id} className="border p-2 rounded">
          {item.type === "image" ? (
            <img src={item.src} alt="media" className="w-full h-48 object-cover rounded" />
          ) : (
            <video src={item.src} controls className="w-full h-48 rounded" />
          )}
        </div>
      ))}
    </div>
	</div>
	
  );
}
