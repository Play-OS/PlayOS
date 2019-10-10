import * as React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../HomeButton';
import BackButton from '../BackButton';
import Profile from '../Profile';
import getIdealTextColor from '../../../services/micro/getIdealTextColor';
import Application from '../../../models/Application';
import Time from '../../atoms/Time';
import SideNavigation from '../SideNavigation';
const styles = require('./Header.scss');

let BACKGROUND_STYLE = 'linear-gradient(to bottom, rgba(24, 25, 25, 0.96) 0%, rgba(129, 238, 142, 0) 100%) 0px 0px repeat scroll rgba(0, 0, 0, 0)';
//let BACKGROUND_STYLE = 'rgba(0, 0, 0, 0) linear-gradient(to right, #00c9fd 0%, #81ee8e 100%) repeat scroll 0 0';
const BACKGROUND_WALLPAPER_STYLE = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.52) 0%, rgba(0, 0, 0, 0) 100%) 0px 0px repeat scroll rgba(0, 0, 0, 0)';
//const DEFAULT_BOX_SHADOW = 'lightgrey 0px 0px 1px 0px';
const DEFAULT_BOX_SHADOW = 'none';

interface Props {
    wallpaperMode?: boolean,
    AppCanvasStore: {
        currentlyOpen: Application,
        openApps: Application[],
        currentlyOpenSettings: {
            navigation: {
                transparent?: boolean,
                backgroundColor: string,
                textColor: string,
            },
            theme_color: string,
            openInNewWindow?: boolean,
            backgroundCompatible?: boolean,
        },
        state: string,
    },
}

interface State {
    navStyle: {
        backgroundColor: string,
        background: string,
        color: string,
        boxShadow?: string;
    },
    isSideBarOpen: boolean,
}

class Header extends React.Component<Props, State> {
    static defaultProps = {
        wallpaperMode: false,
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            navStyle: {
                backgroundColor: 'transparent',
                background: BACKGROUND_STYLE,
                color: 'white',
            },
            isSideBarOpen: false,
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.wallpaperMode && !prevProps.wallpaperMode) {
            // Wallpaper mode changes some estetics so we can better use wallpapers
            BACKGROUND_STYLE = BACKGROUND_WALLPAPER_STYLE;

            this.setState({
                navStyle: {
                    backgroundColor: 'transparent',
                    background: BACKGROUND_STYLE,
                    color: 'white',
                    boxShadow: 'none',
                }
            });
        }
    }

    componentWillReceiveProps(props: Props) {
        const properties = props.AppCanvasStore.currentlyOpenSettings;
        const navStyle = {
            backgroundColor: 'transparent',
            background: BACKGROUND_STYLE,
            color: 'white',
            boxShadow: DEFAULT_BOX_SHADOW,
        };

        if (properties && properties.navigation) {
            const navigationProps = properties.navigation;

            if (typeof navigationProps.transparent !== 'undefined' && !navigationProps.transparent) {
                navStyle.backgroundColor = '#252525';
                delete navStyle.background;
            }

            if (navigationProps.backgroundColor) {
                navStyle.backgroundColor = navigationProps.backgroundColor;
                delete navStyle.background;
            }

            if (navigationProps.textColor) {
                navStyle.color = navigationProps.textColor;
            }

            this.setState({
                navStyle,
            });
        } else if (properties.theme_color) {
            navStyle.backgroundColor = properties.theme_color;
            navStyle.color = getIdealTextColor(properties.theme_color);
            delete navStyle.background;

            this.setState({
                navStyle,
            });
        } else {
            navStyle.boxShadow = this.props.wallpaperMode ? 'none' : DEFAULT_BOX_SHADOW,
            // Resetting to default color scheme.
            this.setState({
                navStyle,
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.state.navStyle} className={styles.Header}>
                    <div className={styles['Header-Item']}>
                        <div className={styles['Header-Controls']}>
                            {/* <BackButton /> */}
                            {/* <HomeButton /> */}
                        </div>
                    </div>
                    <div className={styles['Header-Item']}>
                        <Time />
                    </div>
                    <div className={styles['Header-Item']}>
                        <Profile />
                    </div>
                </div>
                <SideNavigation />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (store: any) => {
    return {
        AppCanvasStore: store.AppCanvasStore,
    };
};

export default connect(mapStateToProps)(Header);
