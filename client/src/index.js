import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';

import './index.css';
import App from './components/App/App';

const history = createBrowserHistory()

ReactDOM.render(
    <React.StrictMode>
        <App history={history} />
    </React.StrictMode>,
    document.getElementById('root')
);
