import React, { ReactElement, ReactNode } from 'react';

import styles from './Page.module.scss';

interface Props {
    children?: ReactNode;
}

export default function Page({
    children,
}: Props): ReactElement {
    return (
        <div className={styles.page}>
            {children}
        </div>
    );
}
