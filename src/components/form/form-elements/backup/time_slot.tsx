"use client";
import React from "react";

import Image from "next/image";

import { useEffect, useState } from "react";
import axios from "axios";


export default function InputGroup() {
	
	

  const [myData,setMydata]= useState([]);
  useEffect(()=>{
   
   axios.get('https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=JHR01' )
   .then((res )=>setMydata(res.data.prayerTime))


},[]);



{/* set current date */}
const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTime(currentTime);
  }, []);






let prayertime=[];

 myData.forEach((nav1, index) => {
    //console.log(nav1.imsak)
	//console.log(nav1.fajr)
	prayertime.push({'time':nav1.imsak,'name':'imsak'})
	prayertime.push({'time':nav1.fajr,'name':'fajr'})
	prayertime.push({'time':nav1.syuruk,'name':'syuruk'})
	
	
	prayertime.push({'time':nav1.dhuha,'name':'dhuha'})
	
	
	prayertime.push({'time':nav1.dhuhr,'name':'dhuhr'})
	
	
	prayertime.push({'time':nav1.asr,'name':'asr'})
	
	
	prayertime.push({'time':nav1.maghrib,'name':'maghrib'})
	
	
	prayertime.push({'time':nav1.isha,'name':'isha'})
	
	
  });

console.log(prayertime);


{/* set current date */}


function convertToAMPM(time24: string) {
  
 
  
  // Split the time string into hours, minutes, seconds
  const [hourStr, minute, second] = time24.split(":");
  let hours = parseInt(hourStr);

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour to 12-hour format
  hours = hours % 12 || 12; // 0 => 12

  return `${hours.toString().padStart(2, "0")}:${minute}:${second} ${ampm}`;
}




{/* time diffrence function */}

function time_fiddfrnce(current_time, end_time) {
const startMinutes = parseAMPM(current_time);
    const endMinutes = parseAMPM(end_time);
    let delta = endMinutes - startMinutes;
	return delta;
}
function parseAMPM(timeStr: string): number {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

{/* end time diffrence function */}






 const media = [
    { type: "image", src: "/images/digital_signage/photo1.png", alt: "Photo 1" },
    { type: "video", src: "/images/digital_signage/video1.mp4" },
    { type: "image", src: "/images/digital_signage/photo2.png", alt: "Photo 2" },
    { type: "video", src: "/images/digital_signage/video2.mp4" },
  ];
 const [currentIndex, setCurrentIndex] = useState(0);
 
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % media.length); // loop back to 0
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  const currentMedia = media[currentIndex];
  
 {/* set time left */}
 const targetDate = new Date("2025-09-01T13:05:00").getTime();



  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

{/* set time left */}	
 
    
    return (
	
	
	
	
	
	
	
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Left Image */}
  <div className="md:col-span-2 bg-gray-200 rounded-lg overflow-hidden">
  
   <div className="text-center text-xl font-bold">
      ⏳ Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
      {timeLeft.seconds}s
    </div>
  
  
  <div style={{ width: "100%", height: "80%", position: "relative" }}>
      {currentMedia.type === "image" ? (
        <Image
          src={currentMedia.src}
          alt={currentMedia.alt || ""}
          layout="fill"
          objectFit="cover"
		  
		  style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <video
          src={currentMedia.src}
          autoPlay
          muted
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  </div>
  
  {/*
  <div className="md:col-span-2 bg-gray-200 rounded-lg overflow-hidden">
    <img
      src="https://totalvdo.com/assets/img/img3.jpg"
      alt="Prayer111"
      className="w-full h-full object-cover"
    />
  </div>
  */}

  {/* Right Times */}
  <div className="md:col-span-1 flex flex-col gap-4">
    {myData.map((nav, index) => (
      <div key={index}>
	  <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          imsak
        </p>
		<div>🕒 Current Time:{time_fiddfrnce(time,convertToAMPM(nav.imsak)) } </div>
        <p className="text-gray-500 text-sm">{convertToAMPM(nav.imsak)}</p>
	  </div>
	   
	   <div>&nbsp;</div>
	   <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          fajr
        </p>
		 <p className="text-gray-500 text-sm">{convertToAMPM(nav.fajr)}</p>
	  </div>
	  
	   <div>&nbsp;</div>
	   <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          dhuha
        </p>
		 <p className="text-gray-500 text-sm">{convertToAMPM(nav.dhuha)}</p>
	  </div>
	  
	   <div>&nbsp;</div>
	   <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          dhuhr
        </p>
		 <p className="text-gray-500 text-sm">{convertToAMPM(nav.dhuhr)}</p>
	  </div>
	  
	   <div>&nbsp;</div>
	   <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          asr
        </p>
		
		<div>🕒 Current Time:{time_fiddfrnce(time,convertToAMPM(nav.asr)) } </div>
		<div>🕒 Current Time:{convertToAMPM(nav.asr) - time} </div>
		
		 <p className="text-gray-500 text-sm">{convertToAMPM(nav.asr)}</p>
	  </div>
	  
	  <div>&nbsp;</div>
	   <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          maghrib
        </p>
		 <p className="text-gray-500 text-sm">{convertToAMPM(nav.maghrib)}</p>
	  </div>
	  
	   <div>&nbsp;</div>
	   <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
          isha
        </p>
		 <p className="text-gray-500 text-sm">{convertToAMPM(nav.isha)}</p>
	  </div>
	  
	  
	  </div>
	  
	  
	  
	  
    ))}
  </div>
</div>
  );
}
