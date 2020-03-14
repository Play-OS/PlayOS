import InstanceBag from '../InstanceBag';
import { ParsedApplicationInfo } from '../../vendor/kernel/core/WasmParser';
import Kernel from '../../vendor/kernel';
import { getDirectoryListing, getFile } from './FileService';

const APPLICATIONS_FOLDER = '/Applications/';

class UserService {
    static async getInstalled(): Promise<ParsedApplicationInfo[]> {
        try {
            const folders = await getDirectoryListing(APPLICATIONS_FOLDER);
            const kernel = InstanceBag.get<Kernel>('kernel');

            const wappPromises: Promise<ParsedApplicationInfo>[] = folders.map(async (folder) => {
                await getFile(`${APPLICATIONS_FOLDER}${folder.name}/manifest.json`);
                return kernel.wasmParser.parseDirectory(`/Applications/${folder.name}`);
            });

            return await Promise.all(wappPromises);
        } catch (error) {
            console.error('[getInstalled()]', error);
            return [];
        }
    }
}

export default UserService;
