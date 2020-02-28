import * as React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return (
        <div>Loading</div>
    );
}

const LoadableStoreApp = Loadable({
    loader: () => import('./Store'),
    loading: Loading,
});

export default LoadableStoreApp;
