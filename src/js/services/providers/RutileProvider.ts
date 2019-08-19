import * as ethers from 'ethers';
import IProvider, { PrivateKey, Account } from './IProvider';

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

    getAccountInfo(key: PrivateKey): Promise<Account> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    fullName: 'Franklin Waller',
                    address: '0x000',
                    profilePic: '',
                    wallpaper: 'https://i.imgur.com/HvLbgjE.jpg',
                });
            }, 2000);
        });
    }
}

export default RutileProvider;
