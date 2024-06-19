const { parse } = require('date-fns');
const { fromZonedTime, toZonedTime } = require('date-fns-tz');

const SOURCE_DATE_FORMAT = 'yyMMddHHmmss';

 /*
  * convert date string from yymmddhhmmss to 20yy-mm-ddThh:mm:ss:00
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
  * you should use another approach
  */
const convertToSystemTimeZone = (rawDate, fromTimeZone) => {
  const date = parseDateString(rawDate);
  return fromZonedTime(date, fromTimeZone);
};

console.log('summer', convertToSystemTimeZone('240619164815', 'Europe/Athens'));
console.log('winter', convertToSystemTimeZone('240219164815', 'Europe/Athens'));

