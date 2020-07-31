import React, { useState } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InfoIcon from '@material-ui/icons/Info';
import AuthService from '../../../services/AuthService';
import AboutDialog from './AboutDialog';
const styles = require('./SideNavigation.module.scss');

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function SideNavigation({
    isOpen,
    onRequestClose,
}: Props) {
    const [isAboutDialogOpen, setAboutDialogOpen] = useState(false);

    async function handleLogoutClick() {
        await AuthService.logout();
        window.location.reload();
    }

    function handleAboutClick() {
        onRequestClose();
        setAboutDialogOpen(true);
    }

    return (
        <>
            <Drawer className={styles.drawer} anchor="right" PaperProps={{ className: styles['side-navigation__paper'] }} open={isOpen} onClose={onRequestClose}>
                <List className={styles.drawerList}>
                    <ListItem className={styles['side-navigation__list-item']} button onClick={handleAboutClick}>
                        <ListItemIcon className={styles['side-navigation__list-item-icon']}>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText>About PlayOS</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleLogoutClick}>
                        <ListItemIcon className={styles['side-navigation__list-item-icon']}>
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
