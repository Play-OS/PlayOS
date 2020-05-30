import React, { ReactElement, useEffect } from 'react';
import AppsContainer from '../../containers/AppsContainer/AppsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { loadApps } from '../../store/applications/applicationsActions';
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
    }, [kernelAvailable]);

    return (
        <AppsContainer apps={apps} loading={loading} />
    );
}
