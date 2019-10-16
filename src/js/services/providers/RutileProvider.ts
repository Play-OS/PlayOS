import * as ethers from "ethers";
import IProvider, { PrivateKey, Account } from "./IProvider";
import Application, { ApplicationStatus } from "../../models/Application";
import Configuration from "../../Configuration";
const Web3 = require("web3");

class RutileProvider implements IProvider {
    web3: any;
    private web3Loaded: Promise<void>;
    private provider: ethers.providers.JsonRpcProvider;
    private privateKey: PrivateKey;

    constructor(host: string, chainId: number) {
        this.provider = new ethers.providers.JsonRpcProvider(host, {
            chainId,
            name: 'rutile',
        });
    }

    setupWeb3WithKeys(privateKey: PrivateKey) {
        this.web3 = new Web3(Configuration.get('providerHost'));

        this.web3.eth.accounts.wallet.add();
        console.log('[] this.web3 -> ', this.web3);
    }

    encrypt(content: Buffer): Promise<Buffer> {
        if (!this.privateKey) {
            throw new Error('Private key must be set before encrypting data');
        }

        return null;
    }

    decrypt(content: Buffer): Promise<Buffer> {
        if (!this.privateKey) {
            throw new Error('Private key must be set before decrypting data');
        }

        return null;
    }

    async login(): Promise<Account> {
        const keys = this.keysFromStorage();
        const wallet = ethers.Wallet.fromMnemonic(keys.mnemonic);

        return this.getAccountInfo(wallet.address);
    }

    async logout(): Promise<void> {
        localStorage.clear();
    }

    async isLoggedIn(): Promise<boolean> {
        await this.web3Loaded;
        const accounts = await this.web3.eth.getAccounts();

        if (accounts.length) {
            return true;
        }

        return false;
    }

    createRandomPrivateKey(): PrivateKey {
        const wallet = ethers.Wallet.createRandom();

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            privateKey: wallet.privateKey
        };
    }

    fromMnemonic(mnemonic: string): PrivateKey {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            privateKey: wallet.privateKey
        };
    }

    saveKeys(keys: PrivateKey) {
        localStorage.setItem("rutile_pk", JSON.stringify(keys));
    }

    keysFromStorage(): PrivateKey {
        const keys = localStorage.getItem("rutile_pk");

        if (!keys) {
            return null;
        }

        return JSON.parse(keys);
    }

    async getAccountInfo(address: string): Promise<Account> {
        const balance = await this.provider.getBalance(address);

        return {
            currencyTicker: "RUT",
            balance: ethers.utils.formatEther(balance),
            fullName: "Franklin Waller",
            address,
            profilePic: "",
            wallpaper: "./res/img/background.jpg"
        };
    }

    async getInstalledApplications(key: PrivateKey): Promise<Application[]> {
        const app: Application = {
            id: "AppId",
            name: "Airhorner",
            short_name: "Airhorner",
            display: 'standalone',
            background_color: '#2196F3',
            theme_color: '#2196F3',
            icons: [
                {
                    sizes: '512x512',
                    src: '/images/touch/android-launchericon-512-512.png',
                    type: 'image/png',
                },
            ],
            scope: '/',
            start_url: '/?homescreen=1',
            manifest_url: 'https://airhorner.com/manifest.json',
            apps: [],
            isFolder: false,
            properties: {
                background_color: "",
                openInNewWindow: true
            },
            status: ApplicationStatus.STANDARD,
            supportedDeviceTypes: []
        };

        const arr: Application[] = [];

        for (let index = 0; index < 97; index++) {
            const newApp: Application = JSON.parse(JSON.stringify(app));

            newApp.id = Math.random().toString();
            newApp.start_url = `${newApp.start_url}&token=${this.getPrivateKeyForApp(newApp.id, 0, key).privateKey}`,

            arr.push(newApp);
        }

        return arr;
    }

    getPrivateKeyForApp(appId: string, nonce: number, userKeys: PrivateKey): PrivateKey {
        // We derive the app key from the private key + the app Id + nonce for extra salt
        const digest = ethers.utils.toUtf8Bytes(`${appId}:${nonce}:${userKeys.privateKey}`);
        const hash = ethers.utils.keccak256(digest);
        const wallet = new ethers.Wallet(hash);

        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic,
        };
    }

    async storageSet(key: string, value: string) {

    }

    async storageGet(key: string) {
        return '';
    }
}

export default RutileProvider;
