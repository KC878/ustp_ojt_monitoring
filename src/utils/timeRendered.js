export const timeRendered = (timeIn, timeOut) => {
  // Helper to convert 12-hour time string to Date object
  function parseTime(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const now = new Date();
    now.setHours(hours, minutes, seconds, 0);
    return now;
  }

  const inTime = parseTime(timeIn);
  let outTime = parseTime(timeOut);

  // Handle overnight shift
  if (outTime < inTime) {
    outTime.setDate(outTime.getDate() + 1);
  }

  const diffMs = outTime - inTime;
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format to HH:MM:SS with leading zeros
  const pad = num => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// // Example usage:
// console.log(computeExactRenderedTime("3:36:02 PM", "11:16:34 PM"));  // Output: "07:40:32"
