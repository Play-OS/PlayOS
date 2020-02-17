// @ts-ignore
import { fetchCommandFromWAPM } from '@wasmer/wasm-terminal/lib/unoptimized/wasm-terminal.esm';
// @ts-ignore
import { lowerI64Imports } from '@wasmer/wasm-transformer/lib/unoptimized/wasm-transformer.esm';
import Kernel, { FileSystem } from '@playos/kernel';
import { getApplicationFromWapp } from './WappService';
import store from '../store';
import InstanceBag from '../InstanceBag';

import { openApp } from '../store/AppProcessesStore';

export default class TerminalService {
    fs: FileSystem;

    currentPath: string;

    terminal: any;

    constructor(fs: FileSystem, currentPath = '/') {
        this.fs = fs;
        this.currentPath = currentPath;
    }

    setTerminal(terminal: any) {
        this.terminal = terminal;
    }

    async handleCommand(commandName: string, args: string[], env: any) {
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

        if (commandName === 'open') {
            return async () => {
                const kernel = InstanceBag.get<Kernel>('kernel');
                const application = await kernel.wasmParser.parseDirectory(args[0]);

                store.dispatch(openApp(application.manifest));
            };
        }

        const kernel = InstanceBag.get<Kernel>('kernel');
        const wasmBinary = await fetchCommandFromWAPM(commandName, [], [['PATH', '/']]);
        const preparedBin = await kernel.vm.prepareBin(wasmBinary);

        // env['$PWD'] = '/';

        // return preparedBin;
        args.unshift(commandName);
        const process = await kernel.spawnProcess(preparedBin, args, {
            env: {
                '$PWD': '/',
                'PWD': '/',
            },
        });

        let terminalResult = '';

        process.on('message', (msg: string) => {
            this.terminal.print(msg);
            terminalResult += msg;
        });

        await process.spawn();

        return () => {
            return terminalResult;
        };
    }
}
