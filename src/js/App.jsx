import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

// Layouts
import DefaultLayout from './layout/DefaultLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChoosePage from './pages/ChoosePage';
import HomePage from './pages/HomePage';

import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

export default class App {
    constructor(id) {
        this.domId = id;
    }

    run() {
        ReactDOM.render(
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={DefaultLayout}>
                        <IndexRedirect to="choose" />
                        <Route path="login" component={LoginPage} />
                        <Route path="register" component={RegisterPage} />
                        <Route path="choose" component={ChoosePage} />
                        <Route path="home" component={HomePage} />
                    </Route>
                </Router>
            </Provider>,
            document.getElementById(this.domId),
        );
    }
}

