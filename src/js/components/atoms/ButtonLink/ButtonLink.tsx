import React, { ReactElement, ReactNode } from 'react';

import MuiButton from '@material-ui/core/Button';

import styles from './ButtonLink.module.scss';

interface Props {
    href: string;
    children?: ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
}

export default function ButtonLink({
    href,
    children,
    variant,
}: Props): ReactElement {
    return (
        <MuiButton className={styles.buttonLink} href={href} fullWidth variant={variant}>{children}</MuiButton>
    );
}
