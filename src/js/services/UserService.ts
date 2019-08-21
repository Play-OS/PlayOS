import IProvider, { PrivateKey } from './providers/IProvider';
import Configuration from '../Configuration';
import Application from '../models/Application';

class UserService {
    static async logout() {

    }

    static async getInstalled(keys: PrivateKey): Promise<Application[]> {
        const provider: IProvider = Configuration.get('provider');
        return provider.getInstalledApplications(keys);
    }
}

export default UserService;
