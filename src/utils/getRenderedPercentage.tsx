function timeStringToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function getRenderedPercentage(renderedTime: string, duration: string): number {
  const renderedSeconds = timeStringToSeconds(renderedTime);
  const durationSeconds = timeStringToSeconds(duration);

  if (durationSeconds === 0) return 0; // Avoid division by zero

  const percentage = (renderedSeconds / durationSeconds) * 100;
  return parseFloat(percentage.toFixed(2)); // Round to 2 decimal places
}
