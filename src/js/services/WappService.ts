import * as JSZip from 'jszip';
import * as path from 'path';
import Application from '../models/Application';

export async function getWappInformation(binary: Uint8Array) {
    try {
        const zip = new JSZip();
        const zipFile = await zip.loadAsync(binary);
        const manifestRaw = await zipFile.file('manifest.json').async('text');
        const manifest: Application = JSON.parse(manifestRaw);
        const iconSrc = (path.resolve('/', manifest.icons[0].src)).slice(1);
        const icon = await zipFile.file(iconSrc).async("blob");

        return {
            icon: URL.createObjectURL(icon),
            app: manifest,
        };
    } catch (error) {
        console.error(error);

        return null;
    }
}
