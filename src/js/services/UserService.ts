import IProvider, { PrivateKey, Account } from './providers/IProvider';
import Configuration from '../Configuration';
import Application from '../models/Application';

class UserService {
    static async login(): Promise<Account> {
        const provider: IProvider = Configuration.get('provider');
        return provider.login();
    }

    static async logout() {
        const provider: IProvider = Configuration.get('provider');
        return provider.logout();
    }

    static async getInstalled(keys: PrivateKey): Promise<Application[]> {
        const provider: IProvider = Configuration.get('provider');
        return provider.getInstalledApplications(keys);
    }
}

export default UserService;
