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
        console.log('[] id -> ', id);
    }

    run() {
        // Check that service workers are supported
        if ('serviceWorker' in navigator) {
            // Use the window load event to keep the page load performant
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./serviceWorker.js');
            });
        }

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
