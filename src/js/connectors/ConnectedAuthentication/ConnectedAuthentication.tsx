import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAuthRequest } from '../../store/auth/authActions';

export default function ConnectedAuthentication(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAuthRequest());
    }, [dispatch]);

    return (
        <div>
            Hello
        </div>
    );
}
