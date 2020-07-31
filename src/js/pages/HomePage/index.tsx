import * as React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return (
        <div>Loading</div>
    );
}

const LoadableHomePage = Loadable({
    loader: () => import('./HomePage'),
    loading: Loading,
});


export default LoadableHomePage;
