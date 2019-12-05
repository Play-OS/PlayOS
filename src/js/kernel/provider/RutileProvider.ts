import * as ethers from 'ethers';
import IKernelProvider from '../interfaces/IKernelProvider';

enum RutileMethods {
    STORAGE_GET = '0x00000002',
    STORAGE_SET = '0x00000001',
}

class RutileProvider implements IKernelProvider {
    privateKey: string;

    coreAddress: string;

    httpHost: string;

    wallet: ethers.Wallet;

    chainProvider: ethers.providers.JsonRpcProvider;

    constructor(httpHost: string, chainId: number, coreAddress: string) {
        this.chainProvider = new ethers.providers.JsonRpcProvider(httpHost, {
            chainId,
            name: 'rutile',
        });

        this.coreAddress = coreAddress;
        this.httpHost = httpHost;
    }

    async setKeys(key: string) {
        this.privateKey = key;
        this.wallet = new ethers.Wallet(key, this.chainProvider);
    }

    async storageGet(key: string) {
        const keyBytes = ethers.utils.toUtf8Bytes(key);
        const keyHex = ethers.utils.hexlify(keyBytes);

        const response = await fetch(this.chainProvider.connection.url, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_call',
                params: [
                    {
                        data: ethers.utils.RLP.encode([
                            RutileMethods.STORAGE_GET,
                            keyHex,
                        ]),
                        from: this.wallet.address,
                        gas: '0xffffff',
                        gasPrice: '0x1',
                        to: this.coreAddress,
                    },
                    'latest',
                ],
            }),
        });

        const data = await response.json();
        return ethers.utils.toUtf8String(Buffer.from(data.result.replace('0x', ''), 'hex'));
    }

    async storageSet(key: string, value: any) {
        const valueBytes = ethers.utils.toUtf8Bytes(value);
        const valueHex = ethers.utils.hexlify(valueBytes);
        const keyBytes = ethers.utils.toUtf8Bytes(key);
        const keyHex = ethers.utils.hexlify(keyBytes);

        const nonce = await this.wallet.getTransactionCount();

        const txParams = {
            // chainId: config.chainId,
            // Datasync set
            data: ethers.utils.RLP.encode([
                RutileMethods.STORAGE_SET,
                keyHex,
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
            await this.wallet.sendTransaction(txParams);
        } catch (error) {}
    }

    async fetchFile(id: string) {
        const response = await fetch(`${this.httpHost}files/get?id=${id}`, {
            method: 'POST',
        });

        return Buffer.from(await response.arrayBuffer());
    }

    async storeFile(file: Buffer) {
        const response = await fetch(`${this.httpHost}files/upload`, {
            method: 'POST',
            body: file,
        });

        const data = await response.json();
        return data[0].path;
    }
}

export default RutileProvider;
