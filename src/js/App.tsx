import * as React from 'react';

import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import RegisterPage from './pages/RegisterPage';
import AuthenticationPage from './pages/AuthenticationPage';
import HomePage from './pages/HomePage';
import store, { history } from './store';

import '../scss/index.scss';

const theme = createMuiTheme({
    typography: {
        fontSize: 20,
    }
});

export default class App {
    domId: string;

    constructor(id: string = 'app') {
        this.domId = id;
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
                    <MuiThemeProvider theme={theme}>
                        <HashRouter>
                            <Switch>
                                <Route exact path="/register" component={RegisterPage} />
                                <Route exact path="/auth" component={AuthenticationPage} />
                                <Route path="/" component={HomePage} />
                                <Redirect to="/home" />
                            </Switch>
                        </HashRouter>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>,
            document.getElementById(this.domId),
        );
    }
}
