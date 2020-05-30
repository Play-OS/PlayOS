import React, { ReactElement } from 'react';

import styles from './TitleBar.module.scss';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

interface Props {
    title: string;
    onMenuClick: () => void;
}


export default function TitleBar({
    title,
    onMenuClick,
}: Props): ReactElement {
    return (
        <AppBar className={styles.wrapper} position="static">
            <Toolbar>
                <IconButton className={styles.menuButton} onClick={onMenuClick}>
                    <MenuIcon className={styles.menuIcon} />
                </IconButton>
                <Typography variant="h4" className={styles.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
