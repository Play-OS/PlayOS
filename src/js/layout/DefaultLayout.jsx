import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import SnackBarMessage from '../components/SnackBarMessage';
import styles from './DefaultLayout.scss';
import classnames from 'classnames';

class DefaultLayout extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired,
        location: PropTypes.shape({
            query: PropTypes.shape({
                redirectUri: PropTypes.string,
            }),
        }).isRequired,
    }

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

                    {this.props.currentPathName !== '/home' &&
                        <section className={styles.defaultLayoutPanel}>
                            <Paper zDepth={5} className={styles.defaultLayoutPanelPaper}>
                                <div className={styles.defaultLayoutPanelMessage}>
                                    <span className={styles.defaultLayoutPanelMessageLogo}>
                                        <img src="./res/img/PlayOSLogoSide_black.svg" alt="Logo" />
                                    </span>
                                </div>
                                <div className={styles.defaultLayoutPanelContent}>
                                    {this.props.children}
                                </div>
                            </Paper>
                        </section>
                    }

                    {this.props.currentPathName === '/home' && <div>{this.props.children}</div> }
                    <SnackBarMessage />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = store => ({
    SnackBarMessageStore: store.SnackBarMessageStore,
    user: store.UserInfoStore,
    currentPathName: store.routing.locationBeforeTransitions ? store.routing.locationBeforeTransitions.pathname : '',
});

export default connect(mapStateToProps)(DefaultLayout);
