import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/components/App';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import { ruLocaleSpec } from 'src/locales/ru.localeSpec';
import { enLocaleSpec } from 'src/locales/en.localeSpec';

// TODO: GLOBAL:
// КРАСИВО НАСТРОИТЬ/ОТСОРТИРОВАТЬ ИМПОРТЫ
// ИЗБАВИТЬСЯ ОТ ЛЮБЫХ ANY
// ИЗБАВИТЬСЯ ОТ НЕНУЖНЫХ ПРОПСОВЫХ ИНТЕРФЕЙСОВ
// ИЗБАВИТЬСЯ ОТ ЛИШНИХ SX
// ПЕРЕНЕСТИ ВСЕ UI-КОМПОНЕНТЫ НА STYLED
// ЗАМЕНИТЬ ВСЕ КОНКАТЕНАЦИИ СТРОК НА ШАБЛОННЫЕ СТРОКИ
// rename all SomeComponentNameProps to Props interface name
// проставить везде key в array.map
// разобраться со всем handleChange/Click, переименовать на более правильный имена (ВАЖНО)

// TODO: FEATURES
// i18n translation

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Router>
      <Provider store={store}>
         <App />
      </Provider>
   </Router>
);
