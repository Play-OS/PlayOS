import { PrivateKey, Account } from './providers/IProvider';
import KeyService from './KeyService';
import Kernel from '../../vendor/kernel';

class AuthService {
    static async getAccountInfo(privateKey: PrivateKey, kernel: Kernel): Promise<Account> {
        const username = await kernel.registry.get<string>('username');

        console.log('[] username -> ', username);

        return {
            currencyTicker: 'RUT',
            balance: '0',
            // balance: ethers.utils.formatEther(balance),
            fullName: username,
            address: privateKey.address,
            profilePic: '',
            wallpaper: './res/img/background.jpg',
        };
    }

    static async login(kernel: Kernel): Promise<Account> {
        const keys = KeyService.keysFromStorage();

        if (!keys) {
            throw new Error('Login failed, no keys found');
        }

        return AuthService.getAccountInfo(keys, kernel);
    }

    static async logout(): Promise<void> {
        KeyService.removeKeys();
        localStorage.clear();
    }

    static async isLoggedIn(): Promise<boolean> {
        const keys = KeyService.keysFromStorage();

        if (!keys) {
            return false;
        }

        return true;
    }
}

export default AuthService;
