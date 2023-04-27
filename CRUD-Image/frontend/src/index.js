import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; //  import provide 
import { store } from './app/store'; // import store
import App from './App';
import "bulma/css/bulma.css";
import axios from "axios";

axios.defaults.withCredentials = true; // setiap req ke server selalu menyerakan credentialnya

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* atribute store maka setiap komponent dapat mengakses store */}
      <App />
    </Provider>
  </React.StrictMode>
);