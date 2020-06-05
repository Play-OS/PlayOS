import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthRequest } from '../../store/auth/authActions';
import { Reducers } from '../../store';
import AuthenticationContainer from '../../containers/AuthenticationContainer/AuthenticationContainer';
import FullscreenLoader from '../../compositions/FullscreenLoader/FullscreenLoader';

export default function ConnectedAuthentication(): ReactElement {
    const dispatch = useDispatch();
    const appManifest = useSelector((state: Reducers) => state.auth.authRequestManifest);

    useEffect(() => {
        dispatch(loadAuthRequest());
    }, [dispatch]);

    if (!appManifest) {
        return <FullscreenLoader />
    }

    return (
        <AuthenticationContainer app={appManifest} />
    );
}
