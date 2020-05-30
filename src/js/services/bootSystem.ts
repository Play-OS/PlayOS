import Kernel, { BrowserProvider, DesktopProvider, SyncProvider, bootKernel } from '../../vendor/kernel';
import { PrivateKey } from './providers/IProvider';
import InstanceBag from '../InstanceBag';
import BackgroundTerminal from '../background/BackgroundTerminal';
import isNodeJs from './isNodeJs';
import ReferenceProvider from '../../vendor/kernel/provider/ReferenceProvider';


export default async function bootSystem(keys: PrivateKey) {
    let kernel: Kernel;

    if (isNodeJs()) {
        const syncProvider = new SyncProvider(new DesktopProvider(), [new BrowserProvider()]);
        kernel = await bootKernel(keys.privateKey, syncProvider);
    } else {
        kernel = await bootKernel(keys.privateKey, new ReferenceProvider()); //new RutileProvider(rutileConfig.httpHost, rutileConfig.chainId, rutileConfig.coreAddress));
    }

    if (sessionStorage.getItem('username')) {
        await kernel.registry.set('username', sessionStorage.getItem('username'), false);
        sessionStorage.removeItem('username');
    }

    const backgroundTerminal = new BackgroundTerminal(kernel);


    console.log('[] kernel -> ', kernel);

    InstanceBag.set('kernel', kernel);
    InstanceBag.set('terminal', backgroundTerminal);
}
