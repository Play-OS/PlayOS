import React, { ReactElement } from 'react';
import RegisterContainer from '../../containers/RegisterContainer/RegisterContainer';
import { RegisterFormValues } from '../../services/RegisterService';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from '../../store/auth/authActions';
import { Reducers } from '../../store';


export default function ConnectedRegister(): ReactElement {
    const dispatch = useDispatch();
    const submitLoading = useSelector((state: Reducers) => state.auth.authLoading);

    function handleSubmit(formValues: RegisterFormValues) {
        dispatch(authRegister(formValues));
    }

    return (
        <RegisterContainer submitLoading={submitLoading} onSubmit={handleSubmit} />
    );
}
