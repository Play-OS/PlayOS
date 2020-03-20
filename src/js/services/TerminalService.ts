// @ts-ignore
import { fetchCommandFromWAPM } from '@wasmer/wasm-terminal';
import { EventEmitter } from 'events';
import Kernel, { FileSystem } from '../../vendor/kernel';
import { getApplicationFromWapp } from './WappService';
import store from '../store';
import InstanceBag from '../InstanceBag';

import { openApp } from '../store/AppProcessesStore';
import Process from '../../vendor/kernel/core/process/Process';

export default class TerminalService extends EventEmitter {
    fs: FileSystem;

    currentPath: string;

    terminal: any;

    constructor(fs: FileSystem, currentPath = '/') {
        super();

        this.fs = fs;
        this.currentPath = currentPath;
    }

    setTerminal(terminal: any) {
        this.terminal = terminal;
    }

    async handleCommand(args: string[], env: any) {
        const commandName = args[0];

        if (commandName.endsWith('.wasm')) {
            return this.fs.readFile(commandName);
        }

        if (commandName.endsWith('.wapp')) {
            const appInfo = await getApplicationFromWapp(commandName);

            if (appInfo && appInfo.isWasm) {
                return appInfo.wasm;
            }

            return 'TODO: Support PWAs';
        }

        if (commandName === 'open') {
            return async () => {
                const kernel = InstanceBag.get<Kernel>('kernel');
                const application = await kernel.wasmParser.parseDirectory(args[1]);

                store.dispatch(openApp(application.manifest));
            };
        }

        const kernel = InstanceBag.get<Kernel>('kernel');
        const wasmBinary = await fetchCommandFromWAPM({
            args,
            env,
        });

        const process = await kernel.createProcess(wasmBinary, args, env);

        this.emit('processCreated', process);

        let terminalResult: string = '';

        if (this.terminal) {
            this.terminal.wasmTty.print('\n');
        }

        process.on('message', (msg: string) => {
            if (this.terminal) {
                this.terminal.wasmTty.print(msg, true);
                terminalResult += msg;
            }
        });

        await process.spawn();

        return () => {
            return terminalResult;
        };
    }
}

export function spawnTerminalProcess(args: string[], env: any): Promise<Process> {
    return new Promise((resolve) => {
        const kernel = InstanceBag.get<Kernel>('kernel');
        const terminalService = new TerminalService(kernel.fs);

        terminalService.on('processCreated', (process: Process) => {
            resolve(process);
        });

        terminalService.handleCommand(args, env);
    });
}
