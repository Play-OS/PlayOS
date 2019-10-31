// @ts-ignore
import WasmFs from "@wasmer/wasmfs/lib/index.esm";
import WasmFsType from '@wasmer/wasmfs';
import { IFs } from "memfs";
import { TFileId, IReadFileOptions } from "memfs/lib/volume";
import { TDataOut } from "memfs/lib/encoding";

export async function createFs() {
    const envContents = '$PWD=/\n$SHELL=/\nPWD=/\nSHELL=/\n$PATH=/\nPATH=/\nUSER=franklinwaller\n$USER=franklinwaller';
    const wasmFs: WasmFsType = new WasmFs();

    const wasm = await (await fetch('/wasm/cowsay.wasm')).arrayBuffer();

    wasmFs.fs.mkdirSync('/Applications/');
    wasmFs.fs.mkdirSync('/Library/');
    wasmFs.fs.mkdirSync('/System/');
    wasmFs.fs.mkdirSync('/Users/franklinwaller/', {
        recursive: true,
    });

    wasmFs.fs.writeFileSync('/Applications/cowsay.wasm', new Uint8Array(wasm));
    wasmFs.fs.writeFileSync('/dev/null', envContents);
    // wasmFs.fs.writeFileSync('.env', envContents);
    wasmFs.fs.writeFileSync('/Users/.env', envContents);
    wasmFs.fs.writeFileSync('/Users/franklinwaller/.env', envContents);

    return wasmFs;
}

export function readFileAsync(fs: IFs, id: TFileId, options?: string | IReadFileOptions): Promise<TDataOut> {
    return new Promise((resolve, reject) => {
        fs.readFile(id, options, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    });
}
