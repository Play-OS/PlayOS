import { Wallet } from 'ethers';
import { PrivateKey } from './providers/IProvider';

const PK_STORAGE_KEY = 'playos_pk';

export default class KeyService {
    static createRadomPrivateKey(): PrivateKey {
        const wallet = Wallet.createRandom();

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            privateKey: wallet.privateKey,
        };
    }

    static fromMnemonic(mnemonic: string): PrivateKey {
        const wallet = Wallet.fromMnemonic(mnemonic);

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            privateKey: wallet.privateKey,
        };
    }

    static keysFromStorage(): PrivateKey | null {
        const key = localStorage.getItem(PK_STORAGE_KEY);

        if (!key) {
            return null;
        }

        return JSON.parse(key);
    }

    static saveKeys(keys: PrivateKey) {
        localStorage.setItem(PK_STORAGE_KEY, JSON.stringify(keys));
    }

    static removeKeys() {
        localStorage.removeItem(PK_STORAGE_KEY);
    }
}
