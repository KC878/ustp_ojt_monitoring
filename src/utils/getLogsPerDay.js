export const countLogsPerDay = (logs, email) => {
  // Days map for reference (Mon-Sat only)
  const dayMap = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };

  // Initialize counter
  const countPerDay = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0
  };

  // Filter by email and count days
  logs.forEach(log => {
    if (log.email === email) {
      const logDate = new Date(log.date); 
      const day = logDate.getDay(); 

      if (day >= 1 && day <= 6) {
        const dayName = dayMap[day];
        countPerDay[dayName]++;
      }
    }
  });

  // Return only the object with counts
  return countPerDay;
}
