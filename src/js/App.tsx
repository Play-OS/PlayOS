import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

// Layouts
import DefaultLayout from './layout/DefaultLayout';

import store, { history } from './store';
import LoadableStoreApp from './apps/Store';

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
                        <Route exact path="/">
                            <Redirect exact from="/" to="/os/choose" />
                        </Route>
                        <Route path="/store" component={LoadableStoreApp} />
                        <Route path="/os" component={DefaultLayout} />
                    </HashRouter>
                </ConnectedRouter>
            </Provider>,
            document.getElementById(this.domId),
        );
    }
}

