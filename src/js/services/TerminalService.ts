
import WasmFs from "@wasmer/wasmfs";

// @ts-ignore
import { fetchCommandFromWAPM } from "@wasmer/wasm-terminal/lib/unoptimized/wasm-terminal.esm";
// @ts-ignore
import { lowerI64Imports } from "@wasmer/wasm-transformer/lib/unoptimized/wasm-transformer.esm";
import { readFileAsync } from "./FileSystemService";
import { getApplicationFromWapp } from "./WappService";

export default class TerminalService {
    wasmFs: WasmFs;
    currentPath: string;

    constructor(wasmFs: WasmFs, currentPath = '/') {
        this.wasmFs = wasmFs;
        this.currentPath = currentPath;
    }

    setupEnv() {
        return new Promise((resolve) => {
            resolve();
        });
    }

    async handleCommand(commandName: string, args: string[], envEntriest: any[]) {
        console.log('[] commandName -> ', commandName);
        console.log('[] args, envEntriest -> ', args, envEntriest);

        // We are trying to execute a binary inside the system
        if (commandName.endsWith('.wasm')) {
            // Fetch the binary from the file system and return it
            return readFileAsync(this.wasmFs.fs, commandName);
        } else if (commandName.endsWith('.wapp')) {
            const appInfo = await getApplicationFromWapp(commandName);

            if (appInfo.isWasm) {
                return appInfo.wasm;
            }

            return 'TODO: Support PWAs';
        }

        // if (commandName === "pwd") {
        //     const callbackCommand = async (args: string[], stdin: string) => {
        //         console.log('[] this -> ', this);

        //         return "Yomama"
        //     };

        //     return callbackCommand;
        // }

        const wasmBinary = await fetchCommandFromWAPM(commandName, [], [['PATH', '/']]);
        return lowerI64Imports(wasmBinary);
    }
}
