import ReactDOM from 'react-dom/client';
import { CartContextProvider } from './store/Cart-Context';
import { ToastProvider } from './store/Toast-Context';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </ToastProvider>

);
