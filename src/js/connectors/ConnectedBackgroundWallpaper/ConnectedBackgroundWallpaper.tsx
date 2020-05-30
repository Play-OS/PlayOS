import React, { ReactElement } from 'react';
import BackgroundWallpaper from '../../components/atoms/BackgroundWallpaper';
import { useSelector } from 'react-redux';
import { Reducers } from '../../store';


export default function ConnectedBackgroundWallpaper(): ReactElement {
    const wallpaper = useSelector((state: Reducers) => state.auth.user?.wallpaper);

    return (
        <BackgroundWallpaper src={wallpaper} />
    );
}
