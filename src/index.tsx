import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/reset.css';
import './css/variables.css';
import './css/index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

