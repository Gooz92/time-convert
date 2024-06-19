const { format } = require('date-fns');
const { convert, convertToSystemTimeZone } = require('./date-utils');
const samples = require('./samples');

const fns = [ convertToSystemTimeZone, convert ];

samples.forEach(sample => {
  const fn = fns[sample.length - 2];
  const result = fn(...sample);

  /*
   * NB!!! console.log by default print date in UTC
   * try execute in node (in browser both output will be in local time)
   * 
   * console.log(new Date());
   * console.log('current', new Date().toString());
   */

  console.log(sample.join(', ') + ' -> ' + format(result, 'yyyy-MM-dd HH:mm:ss'));
});
