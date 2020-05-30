import React from 'react';
import classnames from 'classnames';
import styles from './BackgroundWallpaper.module.scss';

interface Props {
    src?: string;
    className?: string;
}

export default function BackgroundWallpaper(props: Props) {
    const { src } = props;
    const backgroundImage = src ? `url(${src})` : undefined;

    const defaultBackgroundClassName = classnames(styles.defaultBackground, {
        [styles.backgroundSet]: !!backgroundImage,
    });

    return (
        <div className={classnames(styles.wrapper, props.className)}>
            <div className={defaultBackgroundClassName} />
            <div className={styles.background} style={{ backgroundImage }} />
        </div>
    );
}
