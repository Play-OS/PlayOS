import * as React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import InfoIcon from '@material-ui/icons/Info';
import { setOpenSideBarNavigationState } from '../../../store/SideBarNavigationStore';
import UserService from '../../../services/UserService';
import AppInstallDialog from './AppInstallDialog';
import AboutDialog from './AboutDialog';
const styles = require('./SideNavigation.scss');

interface Props {
    isOpen: boolean;
    dispatch: Function;
}

function SideNavigation(props: Props) {
    const [isAppInstallDialogOpen, setAppInstallDialogOpen] = React.useState(false);
    const [isAboutDialogOpen, setAboutDialogOpen] = React.useState(false);

    function handleDrawerOnClose() {
        props.dispatch(setOpenSideBarNavigationState(false));
    }

    async function handleLogoutClick() {
        await UserService.logout();
        location.reload();
    }

    async function handleInstallAppClick() {
        handleDrawerOnClose();
        setAppInstallDialogOpen(true);
    }

    async function handleInstallAppDialogClose() {
        setAppInstallDialogOpen(false);
    }

    function handleAboutClick() {
        handleDrawerOnClose();
        setAboutDialogOpen(true);
    }

    return (
        <>
            <Drawer className={styles.drawer} anchor="right" open={props.isOpen} onClose={handleDrawerOnClose}>
                <List className={styles.drawerList}>
                    <ListItem button onClick={handleInstallAppClick}>
                        <ListItemIcon>
                            <GetAppIcon />
                        </ListItemIcon>
                        <ListItemText>Install App</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleAboutClick}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText>About PlayOS</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleLogoutClick}>
                        <ListItemIcon>
                            <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <AppInstallDialog open={isAppInstallDialogOpen} onClose={handleInstallAppDialogClose} />
            <AboutDialog open={isAboutDialogOpen} onClose={() => setAboutDialogOpen(false)} />
        </>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.UserInfoStore,
    isOpen: state.SideBarNavigationStore.isOpen,
});

export default connect(mapStateToProps)(SideNavigation);
