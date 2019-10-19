import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

// Layouts
import DefaultLayout from './layout/DefaultLayout';

import store, { history } from './store';

export default class App {
    domId: string;

    constructor(id: string = 'app') {
        this.domId = id;
    }

    run() {
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <HashRouter>
                        <Route path="/" component={DefaultLayout} />
                    </HashRouter>
                </ConnectedRouter>
            </Provider>,
            document.getElementById(this.domId),
        );
    }
}

