const { fromZonedTime } = require('date-fns-tz');

const SOURCE_DATE_REGEXP = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?/;

const TARGET_DATE_PATTERN = '20$1-$2-$3T$4:$5:00';

 /*
  * convert date string from yymmddhhmmss to 20yy-mm-ddThh:mm:ss:00
  * every unit of source date contains two digits
  * 2 digits for year (yy)
  * 2 digits for month (mm)
  * ...
  * 2 digits for seconds (ss)
  */
const convertDateString = rawDate =>
    rawDate.replace(SOURCE_DATE_REGEXP, TARGET_DATE_PATTERN);

const convertToSystemTimeZone = (rawDate, fromTimeZone) => {
  const normalizedDateString = convertDateString(rawDate);
  return fromZonedTime(normalizedDateString, fromTimeZone)
};

console.log('summer', convertToSystemTimeZone('240619164815', 'Europe/Athens'));
console.log('winter', convertToSystemTimeZone('240219164815', 'Europe/Athens'));

