import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { white } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new';
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import styles from './SideNavigation.scss';
import ProfilePic from './ProfilePicture.jsx';
import UserService from '../../../services/UserService';
import AuthService from '../../../services/AuthService';
import { setOpenSideBarNavigationState } from '../../../store/SideBarNavigationStore';
import { openApp } from '../../../store/AppProcessesStore';

const SETTINGS_NAMESPACE = 'io.playos.settings';
const BUSINESS_NAMESPACE = 'io.playos.enterprise';

class SideNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.handleRequestChange = this.handleRequestChange.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleRequestChange(open) {
        this.props.dispatch(setOpenSideBarNavigationState(open));
    }

    openApp(namespace) {
        const resultApp = this.props.applicationStore.apps.find(app => app.namespace === namespace);
        this.props.dispatch(openApp(resultApp));
        this.handleRequestChange(false);
    }

    async handleLogoutClick() {
        await AuthService.logout();
        window.location.reload();
    }

    openWallet() {

    }

    getMenuItems() {
        const profileMenuItem = <MenuItem onClick={() => this.handleRequestChange(false)} leftIcon={<ArrowRightIcon color={white} />} rightIcon={<ProfilePic className={styles.profilePic} />}>{this.props.user.info.fullName}</MenuItem>;

        if (!this.props.applicationStore.apps.length) {
            return (
                <React.Fragment>
                    {profileMenuItem}
                    <MenuItem>Loading..</MenuItem>
                </React.Fragment>
            );
        }

        const hasBusiness = !!this.props.applicationStore.apps.find(app => app.namespace === BUSINESS_NAMESPACE);

        return (
            <React.Fragment>
                {profileMenuItem}
                <MenuItem onClick={() => this.openWallet()} leftIcon={<AccountBalanceWalletIcon />}>Wallet</MenuItem>
                <MenuItem onClick={() => this.openApp(SETTINGS_NAMESPACE)} leftIcon={<AccountIcon color={white} />}>Profile</MenuItem>
                { hasBusiness && <MenuItem onClick={() => this.openApp(BUSINESS_NAMESPACE)} leftIcon={<BusinessIcon color={white} />}>Manage accounts</MenuItem>}
                <MenuItem onClick={this.handleLogoutClick} leftIcon={<PowerIcon color={white} />}>Log out</MenuItem>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Drawer disableSwipeToOpen onRequestChange={this.handleRequestChange} open={this.props.sideBarStore.isOpen} docked={false} openSecondary className={styles.drawer}>
                    {this.getMenuItems()}
                </Drawer>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    user: state.UserInfoStore,
    sideBarStore: state.SideBarNavigationStore,
    applicationStore: state.ApplicationStore,
});

export default connect(mapStateToProps)(SideNavigation);
