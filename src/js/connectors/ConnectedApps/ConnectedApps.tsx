import React, { ReactElement, useEffect } from 'react';
import AppsContainer from '../../containers/AppsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { loadApps } from '../../store/apps/appsActions';
import { Reducers } from '../../store';


export default function ConnectedApps(): ReactElement {
    const dispatch = useDispatch();
    const apps = useSelector((state: Reducers) => state.apps.apps);
    const loading = useSelector((state: Reducers) => state.apps.appsLoading);
    const kernelAvailable = useSelector((state: Reducers) => state.kernel.kernelAvailable);

    useEffect(() => {
        if (!kernelAvailable) {
            return;
        }

        if (apps.length) {
            return;
        }

        dispatch(loadApps());
    }, [kernelAvailable, dispatch, apps.length]);

    return (
        <AppsContainer apps={apps} loading={loading} />
    );
}
