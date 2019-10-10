import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyService from '../../services/KeyService';
const styles = require('./RegisterPage.scss');

export default function RegisterPage() {
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        passwordConfirm: '',
    });

    const [keys, setKeys] = React.useState('');

    function handleChange(name: string) {
        return function(event: React.ChangeEvent<HTMLInputElement>) {
            setValues({
                ...values,
                [name]: event.target.value,
            });
        }
    }

    function createAccount() {
        const privateKey = KeyService.createRadomPrivateKey();
        KeyService.saveKeys(privateKey);

        setKeys(privateKey.mnemonic);
    }

    let isPasswordsSame = true;

    if (values.password && values.passwordConfirm) {
        if (values.password !== values.passwordConfirm) {
            isPasswordsSame = false;
        }
    }

    const isAllFieldsFilledIn = values.password && values.passwordConfirm && values.username && isPasswordsSame;

    return (
        <div>
            <div>
                {!keys && <>
                    <TextField className={styles.textField} label="Username" onChange={handleChange('username')} value={values.username} fullWidth />
                    <TextField className={styles.textField} label="Password" type="password" onChange={handleChange('password')} value={values.password} fullWidth />
                    <TextField className={styles.textField} label="Confirm Password" type="password" onChange={handleChange('passwordConfirm')} value={values.passwordConfirm} fullWidth />
                    <Button disabled={!isAllFieldsFilledIn} onClick={createAccount} color="primary" variant="contained" fullWidth>Create account</Button>
                </>}

                {keys && <>
                    <Typography variant="subtitle1" gutterBottom>
                        <b>Please save the following words securely. They are the only way to recover your account.</b>
                    </Typography>
                    <TextField className={styles.textField} multiline InputProps={{ readOnly: true }} value={keys} fullWidth />
                    <Button href="#home" color="primary" variant="contained" fullWidth>I saved my keys</Button>
                </>}
            </div>
        </div>
    );
}
