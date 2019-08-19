import * as React from 'react';
import * as Loadable from 'react-loadable';
// import ProgressBar from '../../../components/molecules/ProgressBar/index';


function Loading() {
    return (
        <div>Loading</div>
        // <ProgressBar />
    );
}

const LoadableHomePage = Loadable({
    loader: () => import('./HomePage'),
    loading: Loading,
});


export default LoadableHomePage;
