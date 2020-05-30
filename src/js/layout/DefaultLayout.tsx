import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, RouteComponentProps } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import styles from './DefaultLayout.module.scss';
import logo from '../../img/PlayOSLogoSide_white.svg';
import ChoosePage from '../pages/ChoosePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import BackgroundWallpaper from '../components/atoms/BackgroundWallpaper';
import AuthService from '../services/AuthService';

function getRoutes() {
    return (
        <>
            <Route path="/os/choose" component={ChoosePage} />
            <Route path="/os/login" component={LoginPage} />
            <Route path="/os/register" component={RegisterPage} />
            <Route path="/os/home" component={HomePage} />
        </>
    );
}

interface Props extends RouteComponentProps {
    user: any;
    currentPathName: string;
}

function DefaultLayout(props: Props) {
    const { user, currentPathName } = props;
    const { wallpaper } = user.info;

    useEffect(() => {
        async function run () {
            const isLoggedIn = await AuthService.isLoggedIn();

            if (isLoggedIn && currentPathName !== '/os/home') {
                props.history.push('/os/home');
            }
        }

        run();
    }, []);

    return (
        <MuiThemeProvider>
            <div className={styles.defaultLayout}>
                <BackgroundWallpaper src={wallpaper} />

                {currentPathName !== '/os/home'
                    && (
                        <>
                            {getRoutes()}
                        </>
                    )}

                {currentPathName === '/os/home'
                    && (
                        <div className={styles.childrenWrapper}>
                            {getRoutes()}
                        </div>
                    )}
            </div>
        </MuiThemeProvider>
    );
}

const mapStateToProps = (store: any) => ({
    SnackBarMessageStore: store.SnackBarMessageStore,
    user: store.UserInfoStore,
    currentPathName: store.router.location ? store.router.location.pathname : '',
});

export default withRouter(connect(mapStateToProps)(DefaultLayout));
