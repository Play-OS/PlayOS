import React, { ReactElement } from 'react';
import Loader from '../../components/Loader/Loader';

import styles from './FullscreenLoader.module.scss';


export default function FullscreenLoader(): ReactElement {
    return (
        <div className={styles['fullscreen-loader']}>
            <Loader />
        </div>
    );
}
