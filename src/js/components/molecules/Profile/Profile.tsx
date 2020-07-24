import React, { ReactElement } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './Profile.module.scss';

interface Props {
    onMenuClick: () => void;
}

export default function Profile({
    onMenuClick,
}: Props): ReactElement {
    return (
        <div className={styles.profile}>
            <div className={styles.name} onClick={onMenuClick}>
                To be determined
            </div>
            <IconButton size="medium" className={styles.menuButton} onClick={onMenuClick}>
                <MenuIcon color="inherit"  />
            </IconButton>
        </div>
    );
}
