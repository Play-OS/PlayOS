import * as ethers from "ethers";
import IProvider, { PrivateKey, Account } from "./IProvider";
import Application, { ApplicationStatus } from "../../models/Application";
import Configuration from "../../Configuration";
import RutileContract from "./RutileContract";
import { executeRutileRpcCall } from "./RutileRpcService";
import RutileMethods from "./RutileMethods";
const Web3 = require("web3");

class RutileProvider implements IProvider {
    web3: any;
    private host: string;
    private web3Loaded: Promise<void>;
    private provider: ethers.providers.JsonRpcProvider;
    private privateKey: PrivateKey;
    private rutileContract: RutileContract;
    private coreAddress: string;

    constructor(host: string, chainId: number, coreAddress: string) {
        this.provider = new ethers.providers.JsonRpcProvider(host, {
            chainId,
            name: 'rutile',
        });

        this.coreAddress = coreAddress;
        this.host = host;

        if (this.getWallet()) {
            this.rutileContract = new RutileContract(coreAddress, this.provider, this.getWallet());
        }
    }

    private getWallet(): ethers.Wallet {
        const keys = this.keysFromStorage();

        if (!keys) {
            return null;
        }

        const wallet = new ethers.Wallet(keys.privateKey, this.provider);
        return wallet;
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

        this.rutileContract = new RutileContract(this.coreAddress, this.provider, this.getWallet());

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
        // const balance = await this.provider.getBalance(address);

        return {
            currencyTicker: "RUT",
            balance: '0',
            // balance: ethers.utils.formatEther(balance),
            fullName: "Test account",
            address,
            profilePic: "",
            wallpaper: "https://playos.io/wp-content/uploads/2019/10/background.jpg?id=4353"
        };
    }

    async getInstalledApplications(key: PrivateKey): Promise<Application[]> {
        const arr: Application[] = [
            {
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
                playos: {
                    isWasm: false,
                    showTerminal: false,
                }
            },
            {
                id: "AppId2",
                name: "Store",
                short_name: "Store",
                display: "standalone",
                background_color: "#2196F3",
                theme_color: "#2196F3",
                icons: [
                    {
                        sizes: '512x512',
                        src: '/images/touch/android-launchericon-512-512.png',
                        type: 'image/png',
                    },
                ],
                scope: '/',
                start_url: 'http://localhost:1234/#/store',
                manifest_url: 'https://airhorner.com/manifest.json',
                playos: {
                    isWasm: false,
                    showTerminal: false,
                }
            },
            {
                id: 'AppId3',
                name: 'Terminal',
                short_name: 'Terminal',
                display: 'standalone',
                background_color: "#000",
                theme_color: "#9E9E9E",
                icons: [
                    {
                        sizes: '512x512',
                        src: 'https://media.idownloadblog.com/wp-content/uploads/2016/02/terminal-app-icon-OS-X.png',
                        type: 'image/png',
                    },
                ],
                scope: '/',
                start_url: '#',
                manifest_url: 'https://airhorner.com/manifest.json',
                playos: {
                    isWasm: true,
                    showTerminal: true,
                }
            }, {
                id: 'FileExplorer',
                name: 'Files',
                short_name: 'Files',
                display: 'standalone',
                background_color: "#fff",
                theme_color: "#2196F3",
                icons: [
                    {
                        sizes: '512x512',
                        src: 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Folder-icon.png',
                        type: 'image/png',
                    },
                ],
                scope: '/',
                start_url: '#',
                manifest_url: 'https://airhorner.com/manifest.json',
                playos: {
                    isWasm: true,
                    showTerminal: false,
                }
            }
        ];

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

    async addApplicationToStore(app: Application) {
        try {
            const wallet = this.getWallet();
            const nonce = await wallet.getTransactionCount();
            const coreAddress = Configuration.get('coreAddress');

            this.rutileContract.addApplicationToStore(app);

            console.log('[] nonce -> ', nonce);
            // const tx = await wallet.sendTransaction({
            //     to: coreAddress,
            //     data: '0x10000001',
            //     gasLimit: 8000000,
            //     gasPrice: 1,
            //     nonce,
            // });

            // console.log('[] tx -> ', tx);
        } catch (error) {
            console.log('[] error -> ', error);
        }
    }

    async storageSet(key: string, value: string) {
        const valueBytes = ethers.utils.toUtf8Bytes(value);
        const valueHex = ethers.utils.hexlify(valueBytes);
        const wallet = this.getWallet();
        const nonce = await wallet.getTransactionCount();

        const txParams = {
            // chainId: config.chainId,
            // Datasync set
            data: ethers.utils.RLP.encode([
                RutileMethods.STORAGE_SET,
                key,
                valueHex,
            ]),
            // Datasync get
            // data: '0x000000026fd014d4a0c005f49869f2e9431322ce745722d9f88311fef41fad61b0098621',
            gasLimit: 8000000,
            gasPrice: 1,
            nonce,
            to: this.coreAddress,
            value: 0,
        };

        try {
            await wallet.sendTransaction(txParams);
        } catch (error) {
            console.error('error -> ', error);
        }
    }

    async storageGet(key: string) {
        const response = await executeRutileRpcCall(this.provider.connection.url, {
            data: ethers.utils.RLP.encode([
                RutileMethods.STORAGE_GET,
                key,
            ]),
            from: this.getWallet().address,
            gas: '0xffffff',
            gasPrice: '0x1',
            to: this.coreAddress,
            // value: 0,
        });

        return ethers.utils.toUtf8String(Buffer.from(response.result.replace('0x', ''), 'hex'));
    }

    async uploadFile(file: Buffer): Promise<string> {
        const response = await fetch(`${this.host}files/upload`, {
            method: 'POST',
            body: file,
        });

        const data = await response.json();
        return data[0].path;
    }

    async fetchFile(id: string): Promise<Buffer> {
        const response = await fetch(`${this.host}files/get?id=${id}`, {
            method: 'POST',
        });

        return Buffer.from(await response.arrayBuffer());
    }
}

export default RutileProvider;
