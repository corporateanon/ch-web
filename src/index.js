import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import localeRu from 'moment/locale/ru';
moment.locale('ru', localeRu);
moment.locale('ru');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
