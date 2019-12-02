import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import history from './modules/history';
import store from './modules/store';
import Main from './modules/Main/container';


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
