import React, { ReactElement, useEffect, useCallback } from 'react';
import { Reducers } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthRequest, approveAuthRequest, cancelAuthRequest, loadLoggedInUser } from '../../store/auth/authActions';
import FullscreenLoader from '../../compositions/FullscreenLoader';
import AuthenticationContainer from '../../containers/AuthenticationPromptContainer';
import { bootKernelSystem } from '../../store/kernel/kernelActions';
import { setAuthLoading } from '../../store/auth/auth';


export default function ConnectedAuthenticationPrompt(): ReactElement {
    const dispatch = useDispatch();
    const authLoading = useSelector((state: Reducers) => state.auth.authLoading);
    const appManifest = useSelector((state: Reducers) => state.auth.authRequestManifest);
    const kernelAvailable = useSelector((state: Reducers) => state.kernel.kernelAvailable);
    const user = useSelector((state: Reducers) => state.auth.user);

    const handleApproveClick = useCallback(() => {
        if (!user) {
            return;
        }

        dispatch(approveAuthRequest(user));
    }, [dispatch, user]);

    const handleCancelClick = useCallback(() => {
        dispatch(cancelAuthRequest());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setAuthLoading(true));
        dispatch(bootKernelSystem());
        dispatch(loadAuthRequest());
    }, [dispatch]);

    useEffect(() => {
        if (kernelAvailable) {
            dispatch(loadLoggedInUser());
            dispatch(setAuthLoading(false));
        }
    }, [kernelAvailable, dispatch]);

    if (authLoading || !appManifest) {
        return <FullscreenLoader />;
    }

    return (
        <AuthenticationContainer
            app={appManifest}
            onApproveClick={handleApproveClick}
            onCancelClick={handleCancelClick}
        />
    );
}
