import React, { ReactElement, useState } from 'react';

import styles from './HeaderContainer.module.scss';
import Profile from '../../components/molecules/Profile';
import SideNavigation from '../../components/molecules/SideNavigation';

export default function HeaderContainer(): ReactElement {
    const [isMenuOpen, setMenuOpen] = useState(false);

    console.log('[] isMenuOpen -> ', isMenuOpen);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerItem}>
                    <img className={styles.headerItemLogo} src="./res/img/PlayOS_LogoOnly_white.svg" alt="PlayOS Logo" />
                </div>

                <div className={styles.headerItem}>
                    <Profile onMenuClick={() => setMenuOpen(true)}  />
                </div>
            </header>
            <SideNavigation
                isOpen={isMenuOpen}
                onRequestClose={() => setMenuOpen(false)}
            />
        </>
    );
}
