import { plurals } from 'src/utils/plurals.util';

export const ruLocaleSpec: moment.LocaleSpecification = {
   monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
   weekdays: 'Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
   weekdaysMin: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
   calendar: {
      lastDay: '[вчера] HH:mm',
      sameDay: 'HH:mm',
      nextDay: '[завтра] HH:mm',
      lastWeek: 'dd HH:mm',
      nextWeek: 'dd HH:mm',
      sameElse: 'D MMM YYYY',
   },
   relativeTime: {
      future: 'в %сек',
      past: '%s назад',
      s: 'пару секунд',
      ss: (s, withoutSuffix) => (withoutSuffix ? plurals(s, 'секунда', 'секунды', 'секунд') : plurals(s, 'секунду', 'секунды', 'секунд')),
      m: (m, withoutSuffix) => (withoutSuffix ? '1 минута' : '1 минуту'),
      mm: (m, withoutSuffix) => (withoutSuffix ? plurals(m, 'минута', 'минуты', 'минут') : plurals(m, 'минуту', 'минуты', 'минут')),
      h: '1 час',
      hh: (h) => plurals(h, 'час', 'часа', 'часов'),
      d: '1 день',
      dd: (d) => plurals(d, 'день', 'дня', 'дней'),
      w: (w, withoutSuffix) => (withoutSuffix ? '1 неделя' : '1 неделю'),
      ww: (w, withoutSuffix) => (withoutSuffix ? plurals(w, 'неделя', 'недели', 'недель') : plurals(w, 'неделю', 'недели', 'недель')),
      M: '1 месяц',
      MM: (m) => plurals(m, 'месяц', 'месяца', 'месяцев'),
      y: '1 год',
      yy: (y) => plurals(y, 'год', 'года', 'лет'),
   },
};
