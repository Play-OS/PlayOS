import React, { ReactElement, useState, useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import trans from '../../lang/trans';
import styles from './Header.module.scss';
import SideNavigation from '../../components/molecules/SideNavigation';

interface Props {
    userName?: string;
}

export default function Header({
    userName = trans('userType.anonymous'),
}: Props): ReactElement {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuButtonClick = useCallback(() => {
        setMenuOpen(true);
    }, [setMenuOpen]);

    const handleRequestMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, [setMenuOpen]);

    return (
        <>
            <div className={styles['header']}>
                <div className={styles['header__item']}>
                    <img src="./res/img/PlayOS_LogoOnly_black.svg" className={styles['header__logo']} alt={trans('alt.logo')} />
                </div>
                <div className={styles['header__item']}>
                    <span>{userName}</span>
                    <IconButton onClick={handleMenuButtonClick} size="medium" className={styles['header__menu-button']}>
                        <MenuIcon color="inherit" />
                    </IconButton>
                </div>
            </div>
            <SideNavigation isOpen={isMenuOpen} onRequestClose={handleRequestMenuClose} />
        </>
    );
}
