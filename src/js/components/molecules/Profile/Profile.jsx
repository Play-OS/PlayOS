import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { white } from 'material-ui/styles/colors';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ProfilePicture from '../SideNavigation/ProfilePicture';
import styles from './Profile.scss';
import CloseAppButton from './CloseAppButton';
import MultiTaskButton from './MultiTaskButton';
import { setOpenSideBarNavigationState } from '../../../store/SideBarNavigationStore';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.handleProfileClick = this.handleProfileClick.bind(this);
    }

    handleProfileClick() {

        this.props.dispatch(setOpenSideBarNavigationState(true));
    }

    render() {
        const arrowLeftStyles = classnames(styles.arrowLeft, {
            [styles.turnedAround]: this.props.navigation.isOpen,
        });

        const isAppOpen = this.props.appCanvasStore.state === 'open';

        return (
            <div className={styles.profile}>
                <div className={styles.mobileProfile}>
                    <MultiTaskButton className={styles.mobileCloseButton} />
                    { !isAppOpen && <NavigationMenuIcon className={styles.hamburgerIcon} color={white} onClick={this.handleProfileClick} /> }
                    { isAppOpen && <CloseAppButton className={styles.mobileCloseButton} /> }
                </div>
                <div className={styles.desktopProfile}>
                    <ArrowLeftIcon onClick={this.handleProfileClick} className={arrowLeftStyles} color={white} />
                    <span className={styles.name} onClick={this.handleProfileClick}>{this.props.user.info.fullName}</span>
                    <MultiTaskButton />
                    <CloseAppButton />
                    <ProfilePicture className={styles.profilePicture} onClick={this.handleProfileClick} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        navigation: store.SideBarNavigationStore,
        appCanvasStore: store.AppCanvasStore,
        user: store.UserInfoStore,
    };
};

export default connect(mapStateToProps)(Profile);
