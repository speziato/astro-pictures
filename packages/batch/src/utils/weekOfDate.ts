// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Slightly modified to use UTC functions.

// Returns the ISO week of the date.
const ISOWeekOfDate = (date = new Date()) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  );
  // Thursday in current week decides the year.
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(d.getUTCFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getUTCDay() + 6) % 7)) /
        7
    )
  );
};

// https://stackoverflow.com/a/45911163

/** Returns the week of a specified date (defaults to today).
 *
 * - iso = false -> assumes weeks start on Sunday. This is the default.
 * - iso = true -> returns ISO week numbers, where weeks start on Monday and the 4st of January always contains the first week.
 */
export const weekOfDate = (date = new Date(), iso = false) => {
  if (iso) return ISOWeekOfDate(date);

  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  );
  d.setUTCDate(d.getUTCDate() - d.getUTCDay());
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};
