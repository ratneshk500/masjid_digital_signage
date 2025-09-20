"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const [gallery, setGallery] = useState([]);

  // Load existing files from DB
  useEffect(() => {
    axios.get("/api/upload").then((res) => setGallery(res.data));
  }, []);

  // Upload new file
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setGallery([res.data, ...gallery]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Image + Video Slider</h1>

      {/* Upload */}
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleUpload}
        className="mb-6"
      />

      {/* Slider */}
      <Swiper spaceBetween={20} slidesPerView={1}>
        {gallery.map((item) => (
          <SwiperSlide key={item._id}>
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            ) : (
              <video
                src={item.url}
                controls
                className="w-full h-80 rounded-lg"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
