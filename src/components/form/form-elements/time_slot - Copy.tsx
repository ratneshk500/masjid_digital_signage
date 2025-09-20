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

let times1=[];

 myData.forEach((nav1, index) => {
    //console.log(nav1.imsak)
	//console.log(nav1.fajr)
	prayertime.push({'time':nav1.imsak,'name':'imsak'})
	times1.push(nav1.imsak)
	
	prayertime.push({'time':nav1.fajr,'name':'fajr'})
	times1.push(nav1.fajr)
	prayertime.push({'time':nav1.syuruk,'name':'syuruk'})
	
	prayertime.push({'time':nav1.dhuha,'name':'dhuha'})
	
	
	prayertime.push({'time':nav1.dhuhr,'name':'dhuhr'})
	
	
	prayertime.push({'time':nav1.asr,'name':'asr'})
	
	
	prayertime.push({'time':nav1.maghrib,'name':'maghrib'})
	
	
	prayertime.push({'time':nav1.isha,'name':'isha'})
	times1.push(nav1.isha)
	
  });

//console.log(prayertime);



//alert(return_datetime);
//alert(return_datetime);
// Find the first time greater than the current time








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


function parseAMPM(timeStr: string): number {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

{/* end time diffrence function */}





  
  
  
  
  
  
  //let return_datetime =[];
  //prayertime.forEach((nav2, index) => {
	
		
//});

 {/* set time left */}
  
  function getNextTime(times) {
  const now = new Date();

  // Convert HH:mm to Date object for today
  const dateTimes = times.map((t) => {
	 
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
	
    return d;
  });0

  // Find first time greater than now
  const nextTime = dateTimes.find((d) => d > now);

  return nextTime || null; // returns null if no future time today
}
  
 //console.log(times1);
  //const times = ["09:00:00", "12:30:00", "15:45:00", "19:00:00"];
  
 
  const times = ["05:39:00", "05:49:00","18:40:00", "20:18:00"];
  const times11 = prayertime.map((h) => h.time);
  console.log(times11);
  console.log(times);
  alert(getNextTime(times));
  const [targetTime, setTargetTime] = useState(getNextTime(times));
  const [timeLeft, setTimeLeft] = useState("");

	alert(targetTime);



  useEffect(() => {
    if (!targetTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);
 
 
 
{/* set time left */}	
 
    
	
	
	
	
	
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
  

	
	
	
    return (
	
	
	
	
	
	
	
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Left Image */}
  <div className="md:col-span-2 bg-gray-200 rounded-lg overflow-hidden">
  
   <div>
      <h2>
        Next Target Time:{" "}
        {targetTime ? targetTime.toLocaleTimeString() : "No more times today"}
      </h2>
      <p>Time Left: {timeLeft}</p>
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
    {prayertime.map((nav, index) => (
      <div key={index}>
	  <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold" > 
		{nav.name}
        </p>
	
        <p className="text-gray-500 text-sm">{convertToAMPM(nav.time)}</p>
	  </div>
	  
	  </div>
	  
	  
	  
	  
    ))}
  </div>
</div>
  );
}
