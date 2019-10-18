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
        provider: new RutileProvider('http://localhost:8545/', 866, '0x00c7109eb8c03ad5f4383ed0ccbc4035f167aacc'),
        coreAddress: '0xb8e0baafd907f3289dbdc0a5174ba786f4b78cf2',
    },
    production: {
        appName: 'Authentication',
        namespace: 'io.playos.authentication',
        apiUrl: '/Api',
        domain: '/',
        host: '/',
        homeUrl: '#/home',
        provider: new RutileProvider('http://localhost:8545/', 866, '0x00c7109eb8c03ad5f4383ed0ccbc4035f167aacc'),
        coreAddress: '0xb8e0baafd907f3289dbdc0a5174ba786f4b78cf2',
    },
};

config.development = config.production;

export default class Configuration {
    static get(key: string) {
        return config[environment][key];
    }

    static set(key: string, value: any) {
        config[environment][key] = value;
    }

    static getEnvironment() {
        return environment;
    }
}
