import React, { ReactElement, ReactNode } from 'react';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './ActiveLink.module.scss';

interface Props {
    href: string;
    children?: ReactNode;
    className?: string;
}


export default function ActiveLink({
    href,
    children,
    className = '',
}: Props): ReactElement {
    const location = useLocation();
    const isActive = location.pathname === href;
    const wrapperClassNames = classnames(styles.wrapper, className, {
        [styles.active]: isActive,
    });

    return (
        <Link to={href} className={wrapperClassNames}>
            {children}
        </Link>
    );
}
