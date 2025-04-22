'use client'


const Clock = () => {

  const timeStamp = Date.now();
  const date = new Date(timeStamp);

  const manilaTime = date.toLocaleString("en-PH", { timeZone: "Asia/Manila"});

  const time = manilaTime.slice(10);




  return (
    <h1> 
      {time}
    </h1>
  );
};

export default Clock;
