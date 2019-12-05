import * as path from 'path';
import InstanceBag from '../InstanceBag';
import Application from '../models/Application';
import Kernel from '../kernel';

export async function getWappInformation(wappFolderPath: string) {
    try {
        const kernel = InstanceBag.get<Kernel>('kernel');
        const manifestRaw = await kernel.fs.readFile(`${wappFolderPath}/manifest.json`);
        const manifest: Application = JSON.parse(manifestRaw.toString());

        let iconBlob: Blob = null;

        if (!manifest.playos.isPwa) {
            const iconPath = path.resolve(wappFolderPath, manifest.icons[0].src);
            const iconRaw: any = await kernel.fs.readFile(iconPath);
            iconBlob = new Blob([iconRaw], { type: 'image/jpeg' });
        } else {
            // The manifest is a PWA, we should fetch the files using the manifest url
            const iconPath = new URL(manifest.icons[0].src, manifest.manifest_url);
            const iconResponse = await fetch(iconPath.href);
            iconBlob = await iconResponse.blob();
        }

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
        const kernal = InstanceBag.get<Kernel>('kernel');
        const manifestRaw = await kernal.fs.readFile(`${wappFolderPath}/manifest.json`);
        const manifest: Application = JSON.parse(manifestRaw.toString());

        let isWasm = false;
        let wasm: Uint8Array = null;

        if (manifest.start_url.endsWith('.wasm')) {
            const wasmPath = path.resolve(wappFolderPath, manifest.start_url);
            const wasmBin: any = await kernal.fs.readFile(wasmPath);

            wasm = wasmBin;
            isWasm = true;
        }

        return {
            wasm,
            isWasm,
            app: manifest,
        };
    } catch (error) {
        console.error(error);

        return null;
    }
}
