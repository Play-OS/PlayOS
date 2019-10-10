import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
// @ts-ignore
import { white } from 'material-ui/styles/colors';
// @ts-ignore
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
// @ts-ignore
import ArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ProfilePicture from '../SideNavigation/ProfilePicture';
import CloseAppButton from './CloseAppButton';
import MultiTaskButton from './MultiTaskButton';
import { setOpenSideBarNavigationState } from '../../../store/SideBarNavigationStore';
import { UserInfo } from '../../../store/UserInfoStore';
import { OpenProcess } from '../../../store/AppProcessesStore';
const styles = require('./Profile.scss');

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
                {/* <MultiTaskButton className={styles.mobileCloseButton} /> */}
                { !isAppOpen && <NavigationMenuIcon className={styles.hamburgerIcon} color={white} onClick={handleProfileClick} /> }
                {/* { isAppOpen && <CloseAppButton className={styles.mobileCloseButton} /> } */}
            </div>
            <div className={styles.desktopProfile}>
                <ArrowLeftIcon onClick={handleProfileClick} className={arrowLeftStyles} color={white} />
                <span className={styles.name} onClick={handleProfileClick}>{props.user.info.fullName}</span>
                {/* <MultiTaskButton /> */}
                {/* <CloseAppButton /> */}
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
