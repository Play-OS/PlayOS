import IProvider, { PrivateKey } from "./providers/IProvider";
import Configuration from "../Configuration";


export default class KeyService {
    static createRadomPrivateKey() {
        const provider: IProvider = Configuration.get('provider');
        return provider.createRandomPrivateKey();
    }

    static fromMnemonic(mnemonic: string) {
        const provider: IProvider = Configuration.get('provider');
        return provider.fromMnemonic(mnemonic);
    }

    static keysFromStorage() {
        const provider: IProvider = Configuration.get('provider');
        return provider.keysFromStorage();
    }

    static saveKeys(keys: PrivateKey) {
        const provider: IProvider = Configuration.get('provider');
        provider.saveKeys(keys);
    }
}
