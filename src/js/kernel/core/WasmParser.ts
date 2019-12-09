import * as path from 'path';
import FileSystem from './FileSystem';
import Application from '../models/Application';
import stringToBytes from '../services/stringToBytes';

const AirhornerWappJson = require('../apps/Airhorner.wapp/manifest.json');
const TerminalWappJson = require('../apps/Terminal.wapp/manifest.json');
const ExplorerWappJson = require('../apps/Explorer.wapp/manifest.json');
const TerminalIcon = require('../apps/Terminal.wapp/icon.png');
const ExplorerIcon = require('../apps/Explorer.wapp/icon.png');

export interface ParsedApplicationInfo {
    manifest: Application;
    icon: Blob;
    binary?: Uint8Array;
    location: string;
}

interface ParseOptions {
    includeBinary: boolean;
}

class WasmParser {
    fs: FileSystem;

    constructor(fs: FileSystem) {
        this.fs = fs;
    }

    /**
     * Parses a directory path to resolve to a icon and manifest
     *
     * @param {string} wappFolderPath
     * @returns
     * @memberof WasmParser
     */
    async parseDirectory(wappFolderPath: string, options?: ParseOptions): Promise<ParsedApplicationInfo> {
        const manifestRaw = await this.fs.readFile(`${wappFolderPath}/manifest.json`);
        const manifest: Application = JSON.parse(manifestRaw.toString());

        return this.parseManifest(manifest, options, wappFolderPath);
    }

    /**
     * Parses a manifest to retrieve it's icon
     *
     * @param {Application} manifest
     * @param {string} [wappFolderPath='/']
     * @returns
     * @memberof WasmParser
     */
    async parseManifest(manifest: Application, options?: ParseOptions, wappFolderPath: string = '/'): Promise<ParsedApplicationInfo> {
        let iconBlob: Blob = null;

        if (!manifest.playos.isPwa) {
            const iconPath = path.resolve(wappFolderPath, manifest.icons[0].src);
            const iconRaw: any = await this.fs.readFile(iconPath);
            iconBlob = new Blob([iconRaw], { type: 'image/jpeg' });
        } else {
            // The manifest is a PWA, we should fetch the files using the manifest url
            const iconPath = new URL(manifest.icons[0].src, manifest.manifest_url);
            const iconResponse = await fetch(iconPath.href);
            iconBlob = await iconResponse.blob();
        }

        let binary: Uint8Array = null;

        if (options && options.includeBinary) {
            if (manifest.start_url.endsWith('.wasm')) {
                const wasmPath = path.resolve(wappFolderPath, manifest.start_url);
                const wasmBin: any = await this.fs.readFile(wasmPath);

                binary = wasmBin;
            }
        }

        return {
            icon: iconBlob,
            manifest,
            binary,
            location: wappFolderPath,
        };
    }

    static async createDefaultApps(fs: FileSystem) {
        await fs.makeDir('/Applications/Airhorner.wapp/');
        await fs.makeDir('/Applications/Terminal.wapp/');
        await fs.makeDir('/Applications/Files.wapp/');

        const terminalPng = stringToBytes(atob(TerminalIcon.replace('data:image/png;base64,', '')));
        const explorerPng = stringToBytes(atob(ExplorerIcon.replace('data:image/png;base64,', '')));

        await fs.writeFile('/Applications/Airhorner.wapp/manifest.json', JSON.stringify(AirhornerWappJson));
        await fs.writeFile('/Applications/Files.wapp/manifest.json', JSON.stringify(ExplorerWappJson));
        await fs.writeFile('/Applications/Terminal.wapp/manifest.json', JSON.stringify(TerminalWappJson));
        await fs.writeFile('/Applications/Terminal.wapp/icon.png', terminalPng);
        await fs.writeFile('/Applications/Files.wapp/icon.png', explorerPng);
    }
}

export default WasmParser;
