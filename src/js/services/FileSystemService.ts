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
    const cowsayIcon = await (await fetch('/wasm/wapp/cowsay/icon.jpg')).arrayBuffer();
    const manifest = await (await fetch('/wasm/wapp/cowsay/manifest.json')).arrayBuffer();

    wasmFs.fs.mkdirSync('/Applications/');
    wasmFs.fs.mkdirSync('/Library/');
    wasmFs.fs.mkdirSync('/System/');
    wasmFs.fs.mkdirSync('/Users/franklinwaller/', {
        recursive: true,
    });

    wasmFs.fs.mkdirSync('/Applications/Cowsay.wapp/Resources/', {
        recursive: true,
    });
    wasmFs.fs.mkdirSync('/Applications/Cowsay.wapp/Contents/', {
        recursive: true,
    });

    wasmFs.fs.writeFileSync('/Applications/Cowsay.wapp/Resources/icon.jpg', new Uint8Array(cowsayIcon));
    wasmFs.fs.writeFileSync('/Applications/Cowsay.wapp/manifest.json', new Uint8Array(manifest));
    wasmFs.fs.writeFileSync('/Applications/Cowsay.wapp/Contents/main.wasm', new Uint8Array(wasm));

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

/**
 * Gets the file extension
 *
 * @export
 * @param {string} fileName
 * @returns {string}
 */
export function getFileExtension(fileName: string): string {
    const fileNameSplitted = fileName.toString().split('.');
    return fileNameSplitted.pop();
}
