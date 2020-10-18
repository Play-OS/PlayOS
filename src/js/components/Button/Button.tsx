import React, { ReactElement } from 'react';
import classnames from 'classnames';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';

import styles from './Button.module.scss';

interface Props extends ButtonProps {

}

export default function Button({
    children,
    variant,
    className,
    ...props
}: Props): ReactElement {
    return (
        <MuiButton {...props} className={classnames(styles.button, className)} fullWidth variant={variant}>
            {children}
        </MuiButton>
    );
}
