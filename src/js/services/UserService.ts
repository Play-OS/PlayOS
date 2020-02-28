import InstanceBag from '../InstanceBag';
import { ParsedApplicationInfo } from '../../vendor/kernel/core/WasmParser';
import Kernel from '../../vendor/kernel';

class UserService {
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
            return [];
        }
    }
}

export default UserService;
