import React, { ReactElement } from 'react';
import { ApplicationViewModel } from '../../models/Application';
import Button from '../../components/atoms/Button';

import styles from './AuthenticationContainer.module.scss';
import trans from '../../lang/trans';

interface Props {
    app: ApplicationViewModel;
    onApproveClick: () => void;
    onCancelClick: () => void;
}


export default function AuthenticationContainer({
    app,
    onApproveClick,
    onCancelClick,
}: Props): ReactElement {
    return (
        <form className={styles.wrapper}>
            <Button fullWidth onClick={onApproveClick}>{trans('button.approve')}</Button>
            <Button fullWidth color="secondary" onClick={onCancelClick}>{trans('button.cancel')}</Button>
        </form>
    );
}
