import { PrivateKey, Account } from "./providers/IProvider";
import KeyService from "./KeyService";

class AuthService {
    static async getAccountInfo(privateKey: PrivateKey): Promise<Account> {
        return {
            currencyTicker: 'RUT',
            balance: '0',
            // balance: ethers.utils.formatEther(balance),
            fullName: 'Test account',
            address: privateKey.address,
            profilePic: '',
            wallpaper: 'https://playos.io/wp-content/uploads/2019/10/background.jpg?id=4353',
        };
    }

    static async login(): Promise<Account> {
        const keys = KeyService.keysFromStorage();

        if (!keys) {
            throw new Error('Login failed, no keys found');
        }

        return AuthService.getAccountInfo(keys);
    }

    static async logout(): Promise<void> {
        KeyService.removeKeys();
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
