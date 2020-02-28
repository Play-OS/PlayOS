import * as React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return (
        <div>Loading</div>
    );
}

const LoadableHomePage = Loadable({
    loader: () => import('./Explorer'),
    loading: Loading,
});


export default LoadableHomePage;
