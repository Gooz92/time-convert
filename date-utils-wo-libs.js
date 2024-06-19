const SOURCE_DATE_REGEXP = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

 /*
  * create date from string in format yymmddhhmmss
  * every unit of source date contains two digits
  * 2 digits for year (yy)
  * 2 digits for month (MM)
  * ...
  * 2 digits for seconds (ss) (ARE SECONDS OPTIONAL ???)
  */

const parseDateString = rawDate =>
  new Date(rawDate.replace(SOURCE_DATE_REGEXP, '20$1-$2-$3T$4:$5:$6'));

// convert date in local time zone to date in given timezone
// so, if you are in Belarus and now is 14:00 and timeZone is 'Europe/Warsaw'
// you receive 13:00 (in summer)
const convertToTimeZone = (date, timeZone) =>
  // 'en-US' because date constructor understand only this format
  new Date(date.toLocaleString('en-US', { timeZone }));

 // NB! This function convert source date to CURRENT SYSTEM TIMEZONE
const convertToSystemTimeZone = (rawDate, fromTimeZone) => {
  const date = parseDateString(rawDate);
  const localTime = date.getTime();
  const timeInSourceTimeZone = convertToTimeZone(date, fromTimeZone).getTime();
  // localTime + offset
  // offset = localTime - timeInSourceTimeZone
  return new Date(2 * localTime - timeInSourceTimeZone);
};

const convert = (rawDate, fromTimeZone, toTimeZone) => {
  const localDate = parseDateString(rawDate);
  const dateInFromTimeZone = convertToTimeZone(localDate, fromTimeZone);
  const dateInToTimeZone = convertToTimeZone(localDate, toTimeZone);
  return new Date(localDate.getTime() - dateInFromTimeZone.getTime() + dateInToTimeZone.getTime());
};

const format2Digits = value => String(value).padStart(2, '0');

const formatDate = date => [
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate()
].map(format2Digits).join('-');

const formatTime = date => [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds()
].map(format2Digits).join(':');

const formatFullDate = date =>
  formatDate(date) + ' ' + formatTime(date);

module.exports = { convertToSystemTimeZone, convert, formatFullDate };
