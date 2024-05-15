import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { MainLayoutProvider } from './Context/MainLayoutContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      
    <PersistGate loading={null} persistor={persistor}>
    <MainLayoutProvider>
      <App />
      
      </MainLayoutProvider>
    </PersistGate>
    </Provider>
   
  </React.StrictMode>
);


