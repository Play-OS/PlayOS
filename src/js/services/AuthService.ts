import Configuration from "../Configuration";
import IProvider, { PrivateKey, Account } from "./providers/IProvider";

class AuthService {
    static async getAccountInfo(privateKey: PrivateKey): Promise<Account> {
        const provider: IProvider = Configuration.get('provider');
        return provider.getAccountInfo(privateKey);
    }
}

export default AuthService;
