import Application from "../../models/Application";

export interface PrivateKey {
    mnemonic: string;
    address: string;
    privateKey: string;
}

export interface Account {
    fullName: string;
    address: string;
    profilePic: string;
    wallpaper: string;
}

export default interface IProvider {
    createRandomPrivateKey: () => PrivateKey;
    fromMnemonic: (mnemonic: string) => PrivateKey;
    keysFromStorage: () => PrivateKey;
    saveKeys: (key: PrivateKey) => void;
    getAccountInfo(key: PrivateKey): Promise<Account>;
    getInstalledApplications(key: PrivateKey): Promise<Application[]>;
}
