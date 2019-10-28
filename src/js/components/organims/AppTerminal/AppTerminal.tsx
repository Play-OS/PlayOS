import * as React from 'react';
// @ts-ignore
import WasmTerminal, { fetchCommandFromWAPM } from "@wasmer/wasm-terminal/dist/unoptimized/wasm-terminal.esm";
// @ts-ignore
import { lowerI64Imports } from "@wasmer/wasm-transformer/dist/unoptimized/wasm-transformer.esm";

import '@wasmer/wasm-terminal/dist/xterm/xterm.css';

const styles = require('./AppTerminal.scss');

interface Props {

}

function AppTerminal(props: Props) {
    const terminalRef = React.useRef(null);

    React.useEffect(() => {
        const fetchCommandHandler = async (commandName: string) => {
            if (commandName === "callback-command") {
                const callbackCommand = async (args: string[], stdin: string) => {
                  return `Callback Command Working! Args: ${args}, stdin: ${stdin}`;
                };

                return callbackCommand;
            }

            const wasmBinary = await fetchCommandFromWAPM(commandName);

            return await lowerI64Imports(wasmBinary);
        }

        const wasmTerminal = new WasmTerminal({
            fetchCommand: fetchCommandHandler,
        });

        wasmTerminal.xterm.setOption('cursorBlink', true);

        wasmTerminal.open(terminalRef.current);
        wasmTerminal.print("PlayOS Terminal [Version 1.0.0]");
        wasmTerminal.print("Powered by Wasmer.io \n");

        console.log('[] wasmTerminal -> ', wasmTerminal);

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
