import RutileProvider from "./services/providers/RutileProvider";

const environment = process.env.NODE_ENV;
const DEV_HOST = 'http://localhost.playos.io/';

const config = {
    development: {
        appName: 'Authentication',
        namespace: 'io.playos.authentication',
        apiUrl: DEV_HOST + 'Api',
        domain: DEV_HOST + 'authentication/',
        host: DEV_HOST,
        homeUrl: DEV_HOST + 'home/',
        provider: new RutileProvider(),
    },
    production: {
        appName: 'Authentication',
        namespace: 'io.playos.authentication',
        apiUrl: '/Api',
        domain: '/',
        host: '/',
        homeUrl: '#/home',
        provider: new RutileProvider(),
    },
};

config.development = config.production;

export default class Configuration {
    static get(key) {
        return config[environment][key];
    }

    static set(key, value) {
        config[environment][key] = value;
    }

    static getEnvironment() {
        return environment;
    }
}
