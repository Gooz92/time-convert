const { format } = require('date-fns');
const { convert, convertToSystemTimeZone } = require('./date-utils');
const {
  convert: customConvert,
  convertToSystemTimeZone: customConvertToSystemTimeZone,
  formatFullDate
} = require('./date-utils-wo-libs');
const samples = require('./samples');

const fnsLibImpl = [ convertToSystemTimeZone, convert ];

const fnsCustomImpl = [ customConvertToSystemTimeZone, customConvert ];

samples.forEach(sample => {
  const libImpl = fnsLibImpl[sample.length - 2];
  const customImpl = fnsCustomImpl[sample.length - 2];

  const result1 = libImpl(...sample);
  const result2 = customImpl(...sample);

  /*
   * NB!!! console.log by default print date in UTC
   * try execute in node (in browser both output will be in local time)
   * 
   * console.log(new Date());
   * console.log('current', new Date().toString());
   */
  
  const stringifiedSample = sample.join(', ');
  console.log('using lib: ', stringifiedSample + ' -> ' + format(result1, 'yyyy-MM-dd HH:mm:ss'));
  console.log('custom:    ', stringifiedSample + ' -> ' + format(result2, 'yyyy-MM-dd HH:mm:ss'));
});
