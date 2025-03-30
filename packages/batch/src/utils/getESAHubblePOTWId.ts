import { weekOfDate } from "./weekOfDate.js";

const getESAHubblePOTWId = (date: Date = new Date()) => {
  let weekNumber = weekOfDate(date, false);
  if (date.getUTCDay() < 2) weekNumber--; // ESA/Hubble releases pictures on Monday, we wait until Tuesday to download to be sure
  const yearTwoDigits = date.getUTCFullYear().toString().substring(2);
  return `potw${yearTwoDigits}${weekNumber}a`;
};

export default getESAHubblePOTWId;
