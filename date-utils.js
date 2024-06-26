const { parse } = require('date-fns');
const { fromZonedTime, toZonedTime } = require('date-fns-tz');

const SOURCE_DATE_FORMAT = 'yyMMddHHmmss';

 /*
  * create date from string in format yymmddhhmmss
  * every unit of source date contains two digits
  * 2 digits for year (yy)
  * 2 digits for month (MM)
  * ...
  * 2 digits for seconds (ss)
  * 
  * more about date formats: https://date-fns.org/v3.6.0/docs/parse
  */
const parseDateString = rawDate =>
  parse(rawDate, SOURCE_DATE_FORMAT, new Date());

 /* NB! This function convert source date to CURRENT SYSTEM TIMEZONE
  * if you need to convert time from one timezone to another specific timezone
  * you should:
  * 1. Convert date to current timezone
  * 2. Get utc time
  * 3. convert utc to target timezone
  */
const convertToSystemTimeZone = (rawDate, fromTimeZone) => {
  const date = parseDateString(rawDate);
  return fromZonedTime(date, fromTimeZone);
};

const convert = (rawDate, fromTimeZone, toTimeZone) => {
  const zonedDate = convertToSystemTimeZone(rawDate, fromTimeZone);
  return toZonedTime(zonedDate.getTime(), toTimeZone);
};

module.exports = { convertToSystemTimeZone, convert };

