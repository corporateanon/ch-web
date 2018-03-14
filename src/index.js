import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import moment from 'moment';
import localeRu from 'moment/locale/ru';

moment.locale('ru', localeRu);
moment.locale('ru');

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
