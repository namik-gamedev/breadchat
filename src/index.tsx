import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'src/components/App';
import { store } from 'src/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Router>
      <Provider store={store}>
         <App />
      </Provider>
   </Router>
);
