const now = new Date();

// Format: "April 8, 2025" (Philippine time)
export const mdyFormattedDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
}).format(now);

// Format: "2025-04-08" (YYYY-MM-DD in Philippine time)
const options = { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' };
const [month, day, year] = new Intl.DateTimeFormat('en-US', options)
  .format(now)
  .split('/');

export const ymdFormattedDate = `${year}-${month}-${day}`;
// every time insert base on Time manila 