import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'src/components/App';
import { store } from 'src/store/store';

// TODO: GLOBAL:
// КРАСИВО НАСТРОИТЬ/ОТСОРТИРОВАТЬ ИМПОРТЫ
// ИЗБАВИТЬСЯ ОТ ЛЮБЫХ ANY
// ИЗБАВИТЬСЯ ОТ НЕНУЖНЫХ ПРОПСОВЫХ ИНТЕРФЕЙСОВ
// ИЗБАВИТЬСЯ ОТ ЛИШНИХ SX
// ПЕРЕНЕСТИ ВСЕ UI-КОМПОНЕНТЫ НА STYLED
// ЗАМЕНИТЬ ВСЕ КОНКАТЕНАЦИИ СТРОК НА ШАБЛОННЫЕ СТРОКИ
// rename all SomeComponentNameProps to Props interface name
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
