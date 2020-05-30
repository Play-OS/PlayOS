import React, { ReactNode } from 'react';

import styles from './Typography.module.scss';

interface Props {
    children?: ReactNode;
}


export default function Typography({
    children,
}: Props) {
    return (
        <p className={styles.paragraph}>
            {children}
        </p>
    );
}
