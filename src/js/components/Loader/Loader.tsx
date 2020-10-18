import React, { ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';

import styles from './Loader.module.scss';


export default function Loader(): ReactElement {
    return (
        <CircularProgress className={styles['loader']} />
    );
}
