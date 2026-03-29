export const convertToIST = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date provided to convertToIST:', date);
    return '';
  }

  // Use local methods to get the date exactly as shown on the user's screen
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Returns YYYY-MM-DD which is timezone-safe for your API
  return `${year}-${month}-${day}`;
};