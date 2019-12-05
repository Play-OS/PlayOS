
import WasmFs from "@wasmer/wasmfs";

// @ts-ignore
import { fetchCommandFromWAPM } from "@wasmer/wasm-terminal/lib/unoptimized/wasm-terminal.esm";
// @ts-ignore
import { lowerI64Imports } from "@wasmer/wasm-transformer/lib/unoptimized/wasm-transformer.esm";
import { getApplicationFromWapp } from "./WappService";
import FileSystem from "../kernel/core/FileSystem";

export default class TerminalService {
    fs: FileSystem;

    currentPath: string;

    constructor(fs: FileSystem, currentPath = '/') {
        this.fs = fs;
        this.currentPath = currentPath;
    }

    async handleCommand(commandName: string, args: string[], envEntriest: any[]) {
        if (commandName.endsWith('.wasm')) {
            return this.fs.readFile(commandName);
        }

        if (commandName.endsWith('.wapp')) {
            const appInfo = await getApplicationFromWapp(commandName);

            if (appInfo.isWasm) {
                return appInfo.wasm;
            }

            return 'TODO: Support PWAs';
        }

        const wasmBinary = await fetchCommandFromWAPM(commandName, [], [['PATH', '/']]);
        return lowerI64Imports(wasmBinary);
    }
}
