import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
// @ts-ignore
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
// @ts-ignore
import ArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ProfilePicture from '../SideNavigation/ProfilePicture';
import { setOpenSideBarNavigationState } from '../../../store/SideBarNavigationStore';
import { UserInfo } from '../../../store/UserInfoStore';
import { OpenProcess } from '../../../store/AppProcessesStore';
const styles = require('./Profile.module.scss');

const black = '#ffffff';

interface Props {
    user: UserInfo;
    navigation: any;
    openProcesses: OpenProcess[];
    dispatch: Function;
}

function Profile(props: Props) {
    function handleProfileClick(){
        props.dispatch(setOpenSideBarNavigationState(true));
    }

    const arrowLeftStyles = classnames(styles.arrowLeft, {
        [styles.turnedAround]: props.navigation.isOpen,
    });

    const isAppOpen = props.openProcesses.length !== 0;

    return (
        <div className={styles.profile}>
            <div className={styles.mobileProfile}>
                { !isAppOpen && <NavigationMenuIcon className={styles.hamburgerIcon} color={black} onClick={handleProfileClick} /> }
                {/* { isAppOpen && <CloseAppButton className={styles.mobileCloseButton} /> } */}
            </div>
            <div className={styles.desktopProfile}>
                <ArrowLeftIcon onClick={handleProfileClick} className={arrowLeftStyles} color={black} />
                <span className={styles.name} onClick={handleProfileClick}>{props.user.info.fullName}</span>
                <ProfilePicture className={styles.profilePicture} onClick={handleProfileClick} />
            </div>
        </div>
    );

}

const mapStateToProps = (store: any) => {
    return {
        navigation: store.SideBarNavigationStore,
        openProcesses: store.AppProcessesStore.openProcesses,
        user: store.UserInfoStore,
    };
};

export default connect(mapStateToProps)(Profile);
