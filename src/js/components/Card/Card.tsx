import React, { ReactElement, ReactNode } from 'react';

import classnames from 'classnames';

import styles from './Card.module.scss';

interface Props {
    children?: ReactNode;
    className?: string;
}

export default function Card({
     children,
     className,
}: Props): ReactElement {
    return (
        <div className={classnames(styles.card, className)}>
            {children}
        </div>
    );
}
