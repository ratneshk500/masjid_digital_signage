"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";

export default function InputGroup() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Left Image */}
  <div className="md:col-span-2 bg-gray-200 rounded-lg overflow-hidden">
    <img
      src="https://via.placeholder.com/800x500"
      alt="Prayer"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Times */}
  <div className="md:col-span-1 flex flex-col gap-4">
    {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer, idx) => (
      <div key={idx} className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold">
          {["05:45 AM", "01:10 PM", "04:30 PM", "07:15 PM", "08:30 PM"][idx]}
        </p>
        <p className="text-gray-500 text-sm">{prayer}</p>
      </div>
    ))}
  </div>
</div>
  );
}
