function computeTimeLeft(requiredTime, renderedTime) {
  // Convert required time "HH:MM:SS" to total seconds
  const [requiredHours, requiredMinutes, requiredSeconds] = requiredTime.split(":").map(Number);
  const requiredTotalSeconds = requiredHours * 3600 + requiredMinutes * 60 + requiredSeconds;

  // Convert rendered time "HH:MM:SS" to total seconds
  const [renderedHours, renderedMinutes, renderedSeconds] = renderedTime.split(":").map(Number);
  const renderedTotalSeconds = renderedHours * 3600 + renderedMinutes * 60 + renderedSeconds;

  // Calculate remaining time in seconds
  let remainingSeconds = requiredTotalSeconds - renderedTotalSeconds;

  // If all time has been rendered or it's overtime, return "00:00:00"
  if (remainingSeconds <= 0) return "00:00:00";

  // Convert remaining seconds back to hours, minutes, and seconds
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  // Format the result as "HH:MM:SS"
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Example usage:
// const requiredTime = "480:00:00";  // Required time in "HH:MM:SS"
// const renderedTime = "07:40:32";  // Rendered time in "HH:MM:SS"

// const timeLeft = computeTimeLeft(requiredTime, renderedTime);
// console.log("Time Left:", timeLeft);  // Output: "472:19:28"
