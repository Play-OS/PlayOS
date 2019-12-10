import Kernel, { BrowserProvider } from '@playos/kernel';
import { PrivateKey } from './providers/IProvider';
import Configuration from '../Configuration';
import InstanceBag from '../InstanceBag';
import BackgroundTerminal from '../background/BackgroundTerminal';

export default async function bootSystem(keys: PrivateKey) {
    const rutileConfig = Configuration.get('providerDetails');
    const kernel = new Kernel(keys.privateKey, new BrowserProvider()); //new RutileProvider(rutileConfig.httpHost, rutileConfig.chainId, rutileConfig.coreAddress));
    await kernel.boot();

    if (sessionStorage.getItem('username')) {
        await kernel.registry.set('username', sessionStorage.getItem('username'), false);
        sessionStorage.removeItem('username');
    }

    const backgroundTerminal = new BackgroundTerminal(kernel);

    InstanceBag.set('kernel', kernel);
    InstanceBag.set('terminal', backgroundTerminal);
}
