import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
const styles = require('./AppHeader.scss');

interface Props {
    title: string;
    menu: React.ReactElement;
}

function AppHeader(props: Props) {
    return (
        <>
            <AppBar position="static" className={styles.appBar}>
                <Toolbar>
                    <IconButton edge="start" aria-label="open drawer" className={styles.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open className={styles.drawer}>
                {props.menu}
            </Drawer>
        </>
    );
}

export default AppHeader;
