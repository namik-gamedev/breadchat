export const enLocaleSpec: moment.LocaleSpecification = {
   monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec.'.split('_'),
   weekdaysShort: 'Mon_Tue_Wed_Thu_Fri_Sat_Sun'.split('_'),
   calendar: {
      lastDay: '[yesterday] HH:mm',
      sameDay: 'HH:mm',
      nextDay: '[tommorow] HH:mm',
      lastWeek: 'ddd HH:mm',
      nextWeek: 'ddd HH:mm',
      sameElse: 'D MMM YYYY',
   },
   relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'few seconds',
      ss: '%d seconds',
      m: '1 minute',
      mm: '%d minutes',
      h: '1 hour',
      hh: '%d hours',
      d: '1 day',
      dd: '%d days',
      w: '1 week',
      ww: '%d weeks',
      M: '1 month',
      MM: '%d months',
      y: '1 year',
      yy: '%d years',
   },
};
