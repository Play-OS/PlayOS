import * as path from 'path';
import { WasmFs } from '@wasmer/wasmfs';
import InstanceBag from '../InstanceBag';
import Application from '../models/Application';
import { readFileAsync } from './FileSystemService';

export async function getWappInformation(wappFolderPath: string) {
    try {
        const wasmFs = InstanceBag.get<WasmFs>('fs');
        const manifestRaw = await readFileAsync(wasmFs.fs, `${wappFolderPath}/manifest.json`);
        const manifest: Application = JSON.parse(manifestRaw.toString());

        const iconPath = path.resolve(wappFolderPath, manifest.icons[0].src);
        const iconRaw: any = await readFileAsync(wasmFs.fs, iconPath);
        const iconBlob = new Blob([iconRaw], { type: 'image/jpeg' });

        return {
            icon: URL.createObjectURL(iconBlob),
            app: manifest,
        };
    } catch (error) {
        console.error(error);

        return null;
    }
}

/**
 * Gets the wasm binary and app information out of the zip file
 *
 * @export
 * @param {string} wappFolderPath
 * @returns
 */
export async function getApplicationFromWapp(wappFolderPath: string) {
    try {
        const wasmFs = InstanceBag.get<WasmFs>('fs');
        const manifestRaw = await readFileAsync(wasmFs.fs, `${wappFolderPath}/manifest.json`);
        const manifest: Application = JSON.parse(manifestRaw.toString());

        let isWasm = false;
        let wasm: Uint8Array = null;

        if (manifest.start_url.endsWith('.wasm')) {
            const wasmPath = path.resolve(wappFolderPath, manifest.start_url);
            const wasmBin: any = await readFileAsync(wasmFs.fs, wasmPath);

            wasm = wasmBin;
            isWasm = true;
        }

        return {
            wasm,
            isWasm,
            app: manifest,
        }
    } catch (error) {
        console.error(error);

        return null;
    }
}
