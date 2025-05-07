export const toManilaYYMMDD = (dateString: string): string => {
  const date = new Date(dateString);

  // Convert to Manila timezone by using UTC offsets (Asia/Manila is UTC+8)
  const manilaDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));

  const year = manilaDate.getFullYear().toString(); // Full year (YYYY)
  const month = (manilaDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day = manilaDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
