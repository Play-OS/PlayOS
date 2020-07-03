import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthRequest, approveAuthRequest } from '../../store/auth/authActions';
import { Reducers } from '../../store';
import AuthenticationContainer from '../../containers/AuthenticationContainer/AuthenticationContainer';
import FullscreenLoader from '../../compositions/FullscreenLoader/FullscreenLoader';

export default function ConnectedAuthentication(): ReactElement {
    const dispatch = useDispatch();
    const authLoading = useSelector((state: Reducers) => state.auth.authLoading);
    const appManifest = useSelector((state: Reducers) => state.auth.authRequestManifest);

    function handleApproveClick(): void {
        dispatch(approveAuthRequest());
    }

    function handleCancelClick(): void {

    }


    useEffect(() => {
        dispatch(loadAuthRequest());
    }, [dispatch]);

    if (authLoading || !appManifest) {
        return <FullscreenLoader />
    }

    return (
        <AuthenticationContainer
            app={appManifest}
            onApproveClick={handleApproveClick}
            onCancelClick={handleCancelClick}
        />
    );
}
