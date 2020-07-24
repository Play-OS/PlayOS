import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InfoIcon from '@material-ui/icons/Info';
import AuthService from '../../../services/AuthService';
import AboutDialog from './AboutDialog';

import styles from './SideNavigation.module.scss';

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function SideNavigation({
    isOpen,
    onRequestClose,
}: Props) {
    const [isAboutDialogOpen, setAboutDialogOpen] = React.useState(false);

    function handleDrawerOnClose() {
        onRequestClose();
    }

    async function handleLogoutClick() {
        await AuthService.logout();
        window.location.reload();
    }

    function handleAboutClick() {
        handleDrawerOnClose();
        setAboutDialogOpen(true);
    }

    return (
        <>
            <Drawer className={styles.drawer} anchor="right" open={isOpen} onClose={handleDrawerOnClose}>
                <List className={styles.drawerList}>
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
            <AboutDialog open={isAboutDialogOpen} onClose={() => setAboutDialogOpen(false)} />
        </>
    );
}
