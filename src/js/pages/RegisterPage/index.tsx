import Loadable from 'react-loadable';
import FullscreenLoader from '../../compositions/FullscreenLoader/FullscreenLoader';

const LoadableRegisterPage = Loadable({
    loader: () => import('./RegisterPage'),
    loading: FullscreenLoader,
});

export default LoadableRegisterPage;
