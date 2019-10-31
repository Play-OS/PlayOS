import * as React from 'react';
// @ts-ignore
import WasmTerminal from "@wasmer/wasm-terminal/lib/unoptimized/wasm-terminal.esm";
// import '@wasmer/wasm-terminal/dist/xterm/xterm.css';
import TerminalService from '../../../services/TerminalService';
import InstanceBag from '../../../InstanceBag';

const styles = require('./AppTerminal.scss');

interface Props {

}

function AppTerminal(props: Props) {
    const terminalRef = React.useRef(null);

    React.useEffect(() => {
        let wasmTerminal: any = null;

        async function setup() {
            const fs = InstanceBag.get<any>('fs');
            const terminalService = new TerminalService(fs);

            terminalService.setupEnv();

            wasmTerminal = new WasmTerminal({
                fetchCommand: terminalService.handleCommand,
                wasmFs: fs,
            });

            wasmTerminal.xterm.setOption('cursorBlink', true);

            wasmTerminal.open(terminalRef.current);
            wasmTerminal.print("PlayOS Terminal [Version 1.0.0]");
            wasmTerminal.print("Powered by Wasmer.io \n");
        }

        setup();

        const intervalId = setInterval(() => {
            wasmTerminal.fit();
        }, 500);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <div className={styles.appTerminal} ref={terminalRef}>
        </div>
    );
}

export default AppTerminal;