import React, { ReactElement, ReactNode } from 'react';

import Card from '../../components/Card';

import styles from './BackgroundCardWithLogo.module.scss';
import BackgroundWallpaper from '../../components/atoms/BackgroundWallpaper';

interface Props {
    children?: ReactNode;
}

export default function BackgroundCardWithLogo({
    children,
}: Props): ReactElement {
    return (
        <>
            <BackgroundWallpaper className={styles.wallpaper} />
            <section className={styles.container}>
                <Card className={styles.card}>
                    <div className={styles.logoWrapper}>
                        <img src="/res/img/PlayOSLogoSide_black.svg" alt="PlayOS logo" />
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </Card>
            </section>
        </>
    );
}
