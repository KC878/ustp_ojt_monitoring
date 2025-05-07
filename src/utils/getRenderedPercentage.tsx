function timeStringToSeconds(time: string): number {
  if (!time) return 0; // Handle null, undefined, or empty string
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function getRenderedPercentage(renderedTime: string | null, duration: string): number {
  if (!renderedTime) return 0; // Return 0 if renderedTime is null or empty

  const renderedSeconds = timeStringToSeconds(renderedTime);
  const durationSeconds = timeStringToSeconds(duration);

  if (durationSeconds === 0) return 0; // Avoid division by zero

  const percentage = (renderedSeconds / durationSeconds) * 100;
  return parseFloat(percentage.toFixed(2)); // Round to 2 decimal places
}
