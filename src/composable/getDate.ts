const currentDate = new Date();

// Extract the year, month, and day from the current date
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
const day = currentDate.getDate();

// Create a formatted date string
export const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

// Display the formatted date
console.log(formattedDate);