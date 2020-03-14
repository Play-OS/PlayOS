import App from './js/App';
import './scss/index.scss';
import packageJson from '../package.json';

const app = new App('app');
app.run();

window.appVersion = packageJson.version;
