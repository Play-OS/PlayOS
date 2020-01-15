import Kernel, { BrowserProvider, DesktopProvider, SyncProvider } from '@playos/kernel';
import { PrivateKey } from './providers/IProvider';
import Configuration from '../Configuration';
import InstanceBag from '../InstanceBag';
import BackgroundTerminal from '../background/BackgroundTerminal';
import isNodeJs from './isNodeJs';


export default async function bootSystem(keys: PrivateKey) {
    const rutileConfig = Configuration.get('providerDetails');
    let kernel: Kernel = null;

    if (isNodeJs()) {
        const syncProvider = new SyncProvider(new DesktopProvider(), [new BrowserProvider()]);
        kernel = new Kernel(keys.privateKey, syncProvider);
    } else {
        kernel = new Kernel(keys.privateKey, new BrowserProvider()); //new RutileProvider(rutileConfig.httpHost, rutileConfig.chainId, rutileConfig.coreAddress));
    }

    await kernel.boot();

    if (!(await kernel.fs.exists('/etc/environment'))) {
        // We need to create some defaults
        await kernel.fs.writeFile('/etc/environment', '$PATH=/usr/sbin:/usr/bin:/sbin:/bin');
    }

    if (sessionStorage.getItem('username')) {
        await kernel.registry.set('username', sessionStorage.getItem('username'), false);
        sessionStorage.removeItem('username');
    }

    const backgroundTerminal = new BackgroundTerminal(kernel);

    InstanceBag.set('kernel', kernel);
    InstanceBag.set('terminal', backgroundTerminal);
}
