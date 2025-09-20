"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";


export default function InputGroup() {
	

  const [myData,setMydata]= useState([]);
  const [values, setValues] = useState<string[]>([]);

  const GetApiData=async()=>{
  const res= await axios.get('https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=JHR01' );
  setMydata(res.data.prayerTime);
    const data123 = await res.data.prayerTime;
    const results: string[] = [];
   
 data123.forEach((nav1, index) => {
    //console.log(nav1.imsak)
	//console.log(nav1.fajr)
// const result = fetchData(nav1.imsak);


  
	results.push({'time':nav1.imsak,'name':'imsak'})
	
	
	results.push({'time':nav1.fajr,'name':'fajr'})
	
	results.push({'time':nav1.syuruk,'name':'syuruk'})
	
	results.push({'time':nav1.dhuha,'name':'dhuha'})
	
	
	results.push({'time':nav1.dhuhr,'name':'dhuhr'})
	
	
	results.push({'time':nav1.asr,'name':'asr'})
	
	
	results.push({'time':nav1.maghrib,'name':'maghrib'})
	
	results.push({'time':nav1.isha,'name':'isha'})
	
	
  });

   setValues(results);




  };

  useEffect(()=>{
   
   //axios.get('https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=JHR01' )
   //.then((res )=>setMydata(res.data.prayerTime))

   GetApiData();


},[]);



  






{/* set current date */}
const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTime(currentTime);
  }, []);









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

 
	

const prayertime=[];



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

  

function getTimeLeft(targetTime: string) {
  const now = new Date();
  const target = new Date();
  
  // targetTime in "HH:MM:SS" 24-hour format
  const [hours, minutes, seconds] = targetTime.split(":").map(Number);

  target.setHours(hours, minutes, seconds, 0);

  // If target already passed today, move it to tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  return { h, m, s };
}







  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number }>({
    h: 0,
    m: 0,
    s: 0,
  });


  const [timeDatap,setTimeDatap]= useState("");
  useEffect(() => {

    const GetApiData_time=async()=>{
  const res= await axios.get('https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=JHR01' );
  setMydata(res.data.prayerTime);
    const data123 = await res.data.prayerTime;
    const results = [];
   
 data123.forEach((nav1, index) => {
    //console.log(nav1.imsak)
	//console.log(nav1.fajr)
// const result = fetchData(nav1.imsak);


  
	results.push({'time':nav1.imsak,'name':'imsak'})
	
	
	results.push({'time':nav1.fajr,'name':'fajr'})
	
	results.push({'time':nav1.syuruk,'name':'syuruk'})
	
	results.push({'time':nav1.dhuha,'name':'dhuha'})
	
	
	results.push({'time':nav1.dhuhr,'name':'dhuhr'})
	
	
	results.push({'time':nav1.asr,'name':'asr'})
	
	
	results.push({'time':nav1.maghrib,'name':'maghrib'})
	
	results.push({'time':nav1.isha,'name':'isha'})
	
	
  });
  const times11 = results.map((h) => h.time);


//const maghrib11 = results.find(p => p.time == timeDatap);
//alert(maghrib11)


const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  //const diffrence= findNearestGreaterTime( '17:00:00', nav1.isha);


let action_value="";
// times11.forEach((nav11, index) => {
  for ( const  num of times11) {

  const diffrence=time_fiddfrnce(currentTime,convertToAMPM(num))

  
if(diffrence > 0)
{
  ///alert(diffrence);

  action_value=num;
  break;

}

//});
  }


 const interval = setInterval(() => {
      ///alert(action_value);
     
     
      const abcvalue=action_value;
      setTimeDatap(abcvalue);
      setTimeLeft(getTimeLeft(abcvalue)); // example target: 5:30 PM
    }, 1000);

    return () => clearInterval(interval);


  };

    
    
    
    
    
    
    
    
    
    GetApiData_time();

   

    
//alert(times11);



    function time_fiddfrnce(current_time, end_time) 
    {
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











   
  }, []);

 
 
 
{/* set time left */}	
 
    
	
//const index = values.findIndex(value1 => value1.time === timeDatap);

//console.log(values[index]);
//const final_val=values[index];
//console.log(final_val);
//alert(final_val)


//alert(index)

///console.log(index);
	
	
	
	/*
 const media = [
    { type: "image", src: "/images/digital_signage/photo1.png", alt: "Photo 1" },
    { type: "video", src: "/images/digital_signage/video1.mp4" },
    { type: "image", src: "/images/digital_signage/photo2.png", alt: "Photo 2" },
    { type: "video", src: "/images/digital_signage/video2.mp4" },
  ];
*/

// const [currentIndex, setCurrentIndex] = useState(0); 

///////////////////////////////////






  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [media, setMedia] = useState([{ type: "image", src: "/images/digital_signage/photo1.png" }]);




  const GetMediaData=async()=>{
  //const res= await axios.get('/api/medialist' );
  
  const res= await axios.get('/api/upload' );
 
 
 
 
 setMedia(res.data);
 const media1 = await res.data;
 const interval = setInterval(() => {
 setCurrentIndex(prev => (prev + 1) % media1.length); // loop back to 0
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // cleanup


  };

  
 useEffect(() => {
    GetMediaData();
  }, []);


console.log(media);


  const currentMedia = media[currentIndex];

  

    return (
	
	
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Left Image */}
  
    <div className="md:col-span-2 bg-gray-200 rounded-lg overflow-hidden">
  
   <div className="text-xl font-bold">
      Time Left: {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s

      <p>Next Target Time: {timeDatap}</p>

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
  


  
  {/* Left Image */}
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
