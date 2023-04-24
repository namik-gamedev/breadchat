import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/components/App';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { BrowserRouter as Router } from 'react-router-dom';

// TODO: GLOBAL:
// КРАСИВО НАСТРОИТЬ/ОТСОРТИРОВАТЬ ИМПОРТЫ
// ИЗБАВИТЬСЯ ОТ ЛЮБЫХ ANY
// ИЗБАВИТЬСЯ ОТ НЕНУЖНЫХ ПРОПСОВЫХ ИНТЕРФЕЙСОВ
// ИЗБАВИТЬСЯ ОТ ЛИШНИХ SX
// ПЕРЕНЕСТИ ВСЕ UI-КОМПОНЕНТЫ НА STYLED
// ЗАМЕНИТЬ ВСЕ КОНКАТЕНАЦИИ СТРОК НА ШАБЛОННЫЕ СТРОКИ

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Router>
         <Provider store={store}>
            <App />
         </Provider>
      </Router>
   </React.StrictMode>
);
