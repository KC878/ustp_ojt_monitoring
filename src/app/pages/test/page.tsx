'use client'

import { ymdFormattedDate } from "@src/utils/date";

const Clock = () => {

  const timeStamp = Date.now();
  const date = new Date(timeStamp);

  const manilaTime = date.toLocaleString("en-PH", { timeZone: "Asia/Manila"});

  const time = manilaTime.slice(10);

  const dateTime = date.toISOString().slice(0, 10);
  const timeIn = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' }).format(date);


  return (
    <>
      <h1> {timeIn} </h1>
      <h1> {ymdFormattedDate}</h1>
    </>
    
  );
};

export default Clock;
