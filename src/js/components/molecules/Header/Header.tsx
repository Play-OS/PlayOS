import * as React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../HomeButton';
import BackButton from '../BackButton';
import Profile from '../Profile';
import Application from '../../../models/Application';
import Time from '../../atoms/Time';
import SideNavigation from '../SideNavigation';
const styles = require('./Header.scss');

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

function Header() {
    return (
        <React.Fragment>
            <div className={styles.Header}>
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

const mapStateToProps = (store: any) => {
    return {
        AppCanvasStore: store.AppCanvasStore,
    };
};

export default connect(mapStateToProps)(Header);
