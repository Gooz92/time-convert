// [ sourceRawDateString, fromTimezone, toTimezone ]
// if toTimezone is not specified local timezone will be used
module.exports = [
  [ '231231235555', 'Europe/London', 'Europe/Warsaw' ], // happy new year!
  [ '231231235555', 'Europe/London' ],

  // There is DST in Ukraine
  [ '200204065550', 'Europe/Kyiv', 'Europe/Samara' ], // winter 
  [ '200604065550', 'Europe/Kyiv', 'Europe/Samara' ], // summer 

  // There is no DST in Russia and Belarus
  [ '200204065551', 'Europe/Minsk', 'Europe/Samara' ], // winter 
  [ '200604065551', 'Europe/Minsk', 'Europe/Samara' ], // summer 

  [ '211020120000', 'Asia/Yakutsk' ]
];
