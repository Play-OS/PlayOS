import React, { ReactElement } from 'react';
import { ApplicationViewModel } from '../../models/Application';
import Button from '../../components/atoms/Button';

import styles from './AuthenticationContainer.module.scss';

interface Props {
    app: ApplicationViewModel;
}


export default function AuthenticationContainer({
    app,
}: Props): ReactElement {
    return (
        <form className={styles.wrapper}>
            <Button fullWidth>Approve</Button>
            <Button fullWidth color="secondary">Cancel</Button>
        </form>
    );
}
