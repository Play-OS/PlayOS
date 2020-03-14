import WasmTerminal from '@wasmer/wasm-terminal';
import Kernel from '../../vendor/kernel';
import TerminalService from '../services/TerminalService';

class BackgroundTerminal {
    kernel: Kernel;
    wasmTerminal: any;

    constructor(kernel: Kernel) {
        this.kernel = kernel;

        const terminalService = new TerminalService(this.kernel.fs, '/');
        const terminalElement = document.createElement('div');

        this.wasmTerminal = new WasmTerminal({
            fetchCommand: (options: any) => terminalService.handleCommand(options.args, options.env),
            wasmFs: this.kernel.fs.wasmFs,
        });

        terminalService.setTerminal(this.wasmTerminal);

        this.wasmTerminal.open(terminalElement);
    }

    async runCommand(command: string) {
        await this.wasmTerminal.runCommand(command);
    }
}

export default BackgroundTerminal;
