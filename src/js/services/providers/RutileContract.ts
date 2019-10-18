import * as ethers from "ethers";
import Application from "../../models/Application";

class RutileContract {
    contract: ethers.Contract;

    constructor(address: string, provider: ethers.providers.JsonRpcProvider, wallet: ethers.Wallet) {
        const abi: string[] = [
            'function addApplicationToStore(string app)',
        ];

        this.contract = new ethers.Contract(address, abi, wallet);
    }

    async addApplicationToStore(app: Application) {
        const data = ethers.utils.toUtf8Bytes(JSON.stringify(app));
        const encodedData = ethers.utils.hexlify(data);

        console.log('[] this.contract -> ', this.contract);

        await this.contract.addApplicationToStore(encodedData);
    }
}

export default RutileContract;
