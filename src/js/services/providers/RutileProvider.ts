import * as ethers from 'ethers';
import IProvider, { PrivateKey, Account } from './IProvider';
import Application, { ApplicationStatus } from '../../models/Application';

class RutileProvider implements IProvider {
    createRandomPrivateKey(): PrivateKey {
        const wallet = ethers.Wallet.createRandom();

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            privateKey: wallet.privateKey,
        };
    }

    fromMnemonic(mnemonic: string): PrivateKey {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            privateKey: wallet.privateKey,
        };
    }

    saveKeys(keys: PrivateKey) {
        localStorage.setItem('rutile_pk', JSON.stringify(keys));
    }

    keysFromStorage() {
        const keys = localStorage.getItem('rutile_pk');

        if (!keys) {
            return null;
        }

        return JSON.parse(keys);
    }

    async getAccountInfo(key: PrivateKey): Promise<Account> {
        return {
            currencyTicker: 'RUT',
            balance: '10000',
            fullName: 'Franklin Waller',
            address: '0x000',
            profilePic: '',
            wallpaper: 'https://i.imgur.com/HvLbgjE.jpg',
        };
    }

    async getInstalledApplications(key: PrivateKey): Promise<Application[]> {
        const app: Application = {
            id: 'AppId',
            title: 'Application',
            apps: [],
            icon: 'https://picsum.photos/512',
            isFolder: false,
            main: `https://google.com/?token=${key.privateKey}`,
            properties: {
                background_color: '',
                openInNewWindow: true,
            },
            status: ApplicationStatus.STANDARD,
            supportedDeviceTypes: [],
        };

        const arr: Application[] = [];

        for (let index = 0; index < 100; index++) {
            const newApp = JSON.parse(JSON.stringify(app));
            newApp.id = Math.random().toString();
            newApp.icon = newApp.icon += '?cachecBuster=' + Math.random().toString();
            arr.push(newApp);
        }

        return arr;
    }
}

export default RutileProvider;
