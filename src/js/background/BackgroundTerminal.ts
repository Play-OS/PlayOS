// @ts-ignore
import WasmTerminal from '@wasmer/wasm-terminal/lib/unoptimized/wasm-terminal.esm';
import Kernel from '../kernel';
import TerminalService from '../services/TerminalService';

class BackgroundTerminal {
    kernel: Kernel;
    wasmTerminal: any;

    constructor(kernel: Kernel) {
        this.kernel = kernel;

        const terminalService = new TerminalService(this.kernel.fs, '/');
        const terminalElement = document.createElement('div');

        this.wasmTerminal = new WasmTerminal({
            fetchCommand: terminalService.handleCommand,
            wasmFs: this.kernel.fs.wasmFs,
        });

        this.wasmTerminal.open(terminalElement);
    }

    async runCommand(command: string) {
        await this.wasmTerminal.runCommand(command);
    }
}

export default BackgroundTerminal;
