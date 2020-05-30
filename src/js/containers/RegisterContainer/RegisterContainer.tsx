import React, { ReactElement, useEffect, useState, FormEvent } from 'react';

import Typography from '../../components/Typography';
import trans from '../../lang/trans';
import Button from '../../components/atoms/Button';
import TextField from '../../components/atoms/TextField/TextField';
import KeyService from '../../services/KeyService';

import styles from './RegisterContainer.module.scss';
import { RegisterFormValues } from '../../services/RegisterService';
import Loader from '../../components/Loader/Loader';

interface Props {
    onSubmit: (formValues: RegisterFormValues) => void;
    submitLoading?: boolean;
}

export default function RegisterContainer({
    onSubmit,
    submitLoading = false,
}: Props): ReactElement {
    const [formValues, setFormValues] = useState<RegisterFormValues>({
        keys: {
            address: '0x',
            mnemonic: '',
            privateKey: '0x',
        },
        username: '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onSubmit(formValues);
    }

    function setFormField(name: string, value: any): void {
        const newFormValues: RegisterFormValues = {
            ...formValues,
            [name]: value,
        };

        setFormValues(newFormValues);
    }

    function handleInputChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setFormField(event.currentTarget.name, event.currentTarget.value);
    }

    useEffect(() => {
        setFormField('keys', KeyService.createRadomPrivateKey());
    }, []);

    return (
        <>
            {submitLoading && (
                <Loader />
            )}

            {!submitLoading && (
                <form onSubmit={handleSubmit}>
                    <Typography>
                        {trans('registerpage.unmanaged.text')}
                    </Typography>

                    <TextField className={styles.textField} value={formValues.username} onChange={handleInputChange} name="username" label={trans('form.username.label')} />
                    <TextField className={styles.textField} multiline readOnly value={formValues.keys.mnemonic} label={trans('form.privatekey.label')} />

                    <Button type="submit" className={styles.button}>{trans('button.register')}</Button>
                </form>
            )}
        </>
    );
}
