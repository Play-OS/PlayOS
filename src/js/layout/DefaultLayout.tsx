import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import classnames from 'classnames';
import styles from './DefaultLayout.module.scss';
import logo from '../../img/PlayOSLogoSide_white.svg';
import ChoosePage from '../pages/ChoosePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import BackgroundWallpaper from '../components/atoms/BackgroundWallpaper';

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

interface Props {
    user: any;
    currentPathName: string;
}

function DefaultLayout(props: Props) {
    const { user, currentPathName } = props;
    const { wallpaper } = user.info;

    return (
        <MuiThemeProvider>
            <div className={styles.defaultLayout}>
                <BackgroundWallpaper src={wallpaper} />

                {currentPathName !== '/os/home'
                    && (
                        <section className={styles.defaultLayoutPanel}>
                            <div className={styles.defaultLayoutPanelMessage}>
                                <span className={styles.defaultLayoutPanelMessageLogo}>
                                    <img src={logo} alt="Logo" />
                                </span>
                            </div>
                            <Paper zDepth={5} className={styles.defaultLayoutPanelPaper}>
                                <div className={styles.defaultLayoutPanelContent}>
                                    {getRoutes()}
                                </div>
                            </Paper>
                        </section>
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

export default connect(mapStateToProps)(DefaultLayout);
