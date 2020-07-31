import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppProcessesHolder from '../../components/organims/AppProcessesHolder';
import { bootKernelSystem } from '../../store/kernel/kernelActions';
import ConnectedApps from '../../connectors/ConnectedApps';
import BackgroundWallpaper from '../../components/atoms/BackgroundWallpaper';
import ConnectedHeader from '../../connectors/ConnectedHeader';

export default function HomePage(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bootKernelSystem());
    }, [dispatch]);

    return (
        <>
            <BackgroundWallpaper />
            <ConnectedHeader />
            <ConnectedApps />
            <AppProcessesHolder />
        </>
    );
}
