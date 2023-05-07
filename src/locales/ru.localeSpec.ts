export const ruLocaleSpec: moment.LocaleSpecification = {
   monthsShort: 'Янв._Фев._Мар._Апр._Мая._Июн._Июл._Авг._Сен._Окт._Ноя._Дек.'.split('_'),
   weekdaysMin: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
   calendar: {
      lastDay: '[вчера] HH:mm',
      sameDay: 'HH:mm',
      nextDay: '[завтра] HH:mm',
      lastWeek: 'dd HH:mm',
      nextWeek: 'dd HH:mm',
      sameElse: 'D MMM YYYY',
   },
};
