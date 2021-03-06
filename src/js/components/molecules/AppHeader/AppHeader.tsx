import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
const styles = require('./AppHeader.module.scss');

interface Props {
    title: string;
    menu: React.ReactElement;
    toolbar?: React.ReactNode;
    children: React.ReactNode;
    headerBackground?: string;
    headerTextColor?: string;
}

function AppHeader(props: Props) {
    const headerBackground = props.headerBackground || '#2196f3';
    const headerTextColor = props.headerTextColor || '#fff';

    return (
        <div className={styles.root}>
            <AppBar position="static" className={styles.appBar} style={{ background: headerBackground }}>
                <Toolbar>
                    {/* <IconButton edge="start" aria-label="open drawer" className={styles.menuButton}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap style={{ color: headerTextColor }} className={styles.title}>
                        {props.title}
                    </Typography>
                    <div>
                        {props.toolbar}
                    </div>
                </Toolbar>
            </AppBar>

            <Hidden smDown implementation="css">
                <Drawer variant="permanent" open className={styles.drawer} classes={{ paper: styles.paper }}>
                    {props.menu}
                </Drawer>
            </Hidden>

            <main className={styles.content}>
                {props.children}
            </main>
        </div>
    );
}

export default AppHeader;
