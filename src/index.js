import 'whatwg-fetch';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './js/App';
import './scss/index.scss';
// import Sdk from '../SDK';
import Configuration from './js/Configuration';
import packageJson from '../package.json';

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
