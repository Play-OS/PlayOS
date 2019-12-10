import IProvider, { PrivateKey, Account } from './providers/IProvider';
import Configuration from '../Configuration';
import Application from '../models/Application';
import InstanceBag from '../InstanceBag';
import Kernel, { ParsedApplicationInfo } from '@playos/kernel';
import Dirent from 'memfs/lib/Dirent';

class UserService {
    static async login(): Promise<Account> {
        const provider: IProvider = Configuration.get('provider');
        return provider.login();
    }

    static async logout() {
        const provider: IProvider = Configuration.get('provider');
        return provider.logout();
    }

    static async getInstalled(): Promise<ParsedApplicationInfo[]> {
        const kernel = InstanceBag.get<Kernel>('kernel');
        const directories: any = await kernel.fs.readDir('/Applications/', {
            ignoreDotFiles: true,
        });

        const wappPromises: Promise<ParsedApplicationInfo>[] = directories.map((directory: string) => {
            return kernel.wasmParser.parseDirectory(`/Applications/${directory}`);
        });

        try {
            return await Promise.all(wappPromises);
        } catch (error) {
            console.error(error);
        }

        return null;
    }
}

export default UserService;
