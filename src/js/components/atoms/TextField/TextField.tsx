import React, { ReactElement } from 'react';

import classnames from 'classnames';
import MuiTextField, { StandardTextFieldProps } from '@material-ui/core/TextField';

import styles from './TextField.module.scss';

interface Props extends StandardTextFieldProps {
    readOnly?: boolean;
}

export default function TextField({
    className,
    readOnly = false,
    ...props
}: Props): ReactElement {
    return (
        <MuiTextField
            fullWidth
            {...props}
            className={classnames(styles.textfield, className)}
            InputLabelProps={{
                className: styles.label,
            }}
            InputProps={{
                className: styles.input,
                readOnly,
            }}
        />
    );
}
