import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import styles from './DefaultLayout.module.scss';
import classnames from 'classnames';
import logo from '../../img/PlayOSLogoSide_black.svg';
import ChoosePage from '../pages/ChoosePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';

function getRoutes() {
    return (
        <>
            <Route path="/os/choose" component={ChoosePage} />
            <Route path="/os/login" component={LoginPage} />
            <Route path="/os/register" component={RegisterPage} />
            <Route path="/os/home" component={HomePage} />
        </>
    )
}

class DefaultLayout extends React.Component {
    render() {
        const wallpaper = this.props.user.info.wallpaper;
        const backgroundImage = wallpaper ? `url(${wallpaper})` : null;
        const backgroundClasses = classnames(styles.defaultLayoutBackground, {
            [styles.defaultLayoutBackgroundDefault]: !wallpaper,
        });

        return (
            <MuiThemeProvider>
                <div className={styles.defaultLayout}>
                    {/* The background, we can keep that across the site */}
                    <div
                        className={backgroundClasses}
                        style={{
                            backgroundImage,
                        }}
                    />

                    {this.props.currentPathName !== '/os/home' &&
                        <section className={styles.defaultLayoutPanel}>
                            <Paper zDepth={5} className={styles.defaultLayoutPanelPaper}>
                                <div className={styles.defaultLayoutPanelMessage}>
                                    <span className={styles.defaultLayoutPanelMessageLogo}>
                                        <img src={logo} alt="Logo" />
                                    </span>
                                </div>
                                <div className={styles.defaultLayoutPanelContent}>
                                    {getRoutes()}
                                </div>
                            </Paper>
                        </section>
                    }

                    {this.props.currentPathName === '/os/home' &&
                        <div className={styles.childrenWrapper}>
                            {getRoutes()}
                        </div>
                    }
                    {/* <SnackBarMessage /> */}
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = store => {
    return ({
        SnackBarMessageStore: store.SnackBarMessageStore,
        user: store.UserInfoStore,
        currentPathName: store.router.location ? store.router.location.pathname : '',
    })
};

export default connect(mapStateToProps)(DefaultLayout);
