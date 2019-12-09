import Registry from './core/Registry';
import FileSystem from './core/FileSystem';
import IKernelProvider from './interfaces/IKernelProvider';
import VirtualMachine from './core/VirtualMachine';
import Encryption from './core/Encryption';
import WasmParser from './core/WasmParser';

class Kernel {
    registry: Registry;

    fs: FileSystem;

    vm: VirtualMachine;

    encryption: Encryption;

    privateSeed: string;

    provider: IKernelProvider;

    wasmParser: WasmParser;

    constructor(privateSeed: string, provider: IKernelProvider) {
        this.privateSeed = privateSeed;
        this.provider = provider;
    }

    /**
     * "Boots" the kernel. This sets everything up (fs, vm, enc, etc)
     *
     * @memberof Kernel
     */
    async boot() {
        this.registry = new Registry({}, this.provider);
        this.encryption = new Encryption(this.privateSeed);

        this.provider.setKeys(this.encryption.createKey('provider'));

        this.fs = await FileSystem.create(this.registry, this.provider);
        this.wasmParser = new WasmParser(this.fs);
        this.vm = new VirtualMachine();
    }
}

export default Kernel;
