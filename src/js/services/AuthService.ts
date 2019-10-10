import Configuration from "../Configuration";
import IProvider, { PrivateKey, Account } from "./providers/IProvider";

class AuthService {
    static async getAccountInfo(privateKey: PrivateKey): Promise<Account> {
        const provider: IProvider = Configuration.get('provider');
        return provider.getAccountInfo('');
    }

    static async login(): Promise<Account> {
        const provider: IProvider = Configuration.get('provider');
        return provider.login();
    }

    static async isLoggedIn(): Promise<boolean> {
        const provider: IProvider = Configuration.get('provider');
        return provider.isLoggedIn();
    }
}

export default AuthService;
