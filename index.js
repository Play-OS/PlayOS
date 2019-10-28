import 'whatwg-fetch';
import 'babel-polyfill';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './src/js/App';
import './src/scss/index.scss';
// import Sdk from '../SDK';
import InstanceBag from './src/js/InstanceBag';
import Configuration from './src/js/Configuration';
import packageJson from './package.json';

// injectTapEventPlugin();

const env = Configuration.getEnvironment();
// const sdkEnv = env === 'production' ? 'root' : env;

// const sdk = new Sdk('__playos_auth_development', {
//     environment: sdkEnv,
// });

// InstanceBag.set('sdk', sdk);
const app = new App('app');
app.run();

window.appVersion = packageJson.version;
