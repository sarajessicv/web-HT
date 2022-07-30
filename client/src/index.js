import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import fi from "./locales/fi/translation.json";
import en from "./locales/en/translation.json";

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping                              // language to use
  resources: {
      en: {
          common: en               // 'common' is our custom namespace
      },
      fi: {
          common: fi
      },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

