export const enLocaleSpec: moment.LocaleSpecification = {
   monthsShort: 'Jan._Feb._Mar._Apr._May._Jun._Jul._Aug._Sep._Oct._Nov._Dec.'.split('_'),
   weekdaysShort: 'Mon_Tue_Wed_Thu_Fri_Sat_Sun'.split('_'),
   calendar: {
      lastDay: '[yesterday] HH:mm',
      sameDay: 'HH:mm',
      nextDay: '[tommorow] HH:mm',
      lastWeek: 'ddd HH:mm',
      nextWeek: 'ddd HH:mm',
      sameElse: 'D MMM YYYY',
   },
};
