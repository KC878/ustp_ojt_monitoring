import { useEffect, useState } from "react";

const Clock = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPhilippineTime = () => {
    return new Date(dateTime.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(getPhilippineTime());

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(getPhilippineTime());

  return (
    <div>
      <div style={{color: 'black'}}><strong>{formattedTime}</strong></div>
      <div>{formattedDate}</div>
    </div>
  );
};

export default Clock;
