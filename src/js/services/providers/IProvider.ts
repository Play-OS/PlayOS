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
    currencyTicker: string;
    balance: string;
}

export default interface IProvider {
    createRandomPrivateKey: () => PrivateKey;
    fromMnemonic: (mnemonic: string) => PrivateKey;
    keysFromStorage: () => PrivateKey;
    saveKeys: (key: PrivateKey) => void;
    getAccountInfo(address: string): Promise<Account>;
    getInstalledApplications(key: PrivateKey): Promise<Application[]>;
    login(): Promise<Account>;
    logout(): Promise<void>;
    encrypt(content: Buffer): Promise<Buffer>;
    decrypt(content: Buffer): Promise<Buffer>;
    isLoggedIn(): Promise<boolean>;
    getPrivateKeyForApp(appId: string, nonce: number, userKeys: PrivateKey): PrivateKey;
    storageSet(key: string, value: string): Promise<void>;
    storageGet(key: string): Promise<string>;
    addApplicationToStore(app: Application): Promise<void>;
    getApplicationsByCategory(category: string): Promise<Application[]>;
}
