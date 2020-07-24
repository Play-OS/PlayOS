import React, { useEffect } from 'react';
import ConnectedHeader from '../../connectors/ConnectedHeader/ConnectedHeader';
import BackgroundWallpaper from '../../components/atoms/BackgroundWallpaper';
import ConnectedApps from '../../connectors/ConnectedApps/ConnectedApps';
import { bootKernelSystem } from '../../store/kernel/kernelActions';
import { useDispatch } from 'react-redux';

export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bootKernelSystem());
    }, []);

    return (
        <>
            <BackgroundWallpaper />
            <ConnectedHeader />
            <ConnectedApps />
        </>
    );
};
