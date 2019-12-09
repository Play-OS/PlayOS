// @ts-ignore
import WasmFs from '@wasmer/wasmfs/lib/index.esm';
import WasmFsType from '@wasmer/wasmfs';
import { TFileId, IReadFileOptions, TData, TFilePath, TMode, IMkdirOptions } from 'memfs/lib/volume';
import { TDataOut, TEncodingExtended } from 'memfs/lib/encoding';
import stringToBytes from '../services/stringToBytes';
import Registry from './Registry';
import IKernelProvider from '../interfaces/IKernelProvider';
import WasmParser from './WasmParser';
import Dirent from 'memfs/lib/Dirent';

interface FileSystemDirOptions {
    encoding?: TEncodingExtended;
    withFileTypes?: boolean;
    ignoreDotFiles?: boolean;
}

class FileSystem {
    private registry: Registry;

    private provider: IKernelProvider;

    public wasmFs: WasmFsType;

    constructor(registry: Registry, provider: IKernelProvider) {
        this.registry = registry;
        this.wasmFs = new WasmFs();
        this.provider = provider;
    }

    async init() {
        const fileSystemMapId = await this.registry.get<string>('fs_map');

        if (!fileSystemMapId) {
            // Create our default folders
            this.wasmFs.fs.mkdirSync('/Applications/');
            this.wasmFs.fs.mkdirSync('/Library/');
            this.wasmFs.fs.mkdirSync('/System/');
            this.wasmFs.fs.mkdirSync('/Users/franklinwaller/', {
                recursive: true,
            });

            this.wasmFs.fs.writeFileSync('/Applications/.keep', '');
            this.wasmFs.fs.writeFileSync('/Library/.keep', '');
            this.wasmFs.fs.writeFileSync('/System/.keep', '');
            this.wasmFs.fs.writeFileSync('/Users/franklinwaller/.keep', '');

            const fsBundle = this.wasmFs.toJSON();
            const fileId = await this.provider.storeFile(Buffer.from(stringToBytes(JSON.stringify(fsBundle))));

            await this.registry.set('fs_map', fileId, false);
        } else {
            const fileMapRaw = (await this.provider.fetchFile(fileSystemMapId)).toString();
            const fileMap = JSON.parse(fileMapRaw);

            this.wasmFs.fromJSON(fileMap);
        }

        await WasmParser.createDefaultApps(this);
    }

    /**
     * Reads a file from the filesystem
     *
     * @param {TFileId} id
     * @param {(string | IReadFileOptions)} [options]
     * @returns {Promise<TDataOut>}
     * @memberof FileSystem
     */
    readFile(id: TFileId, options?: string | IReadFileOptions): Promise<TDataOut> {
        return new Promise((resolve, reject) => {
            this.wasmFs.fs.readFile(id, options, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Writes a file to the filesystem
     *
     * @param {TFileId} id
     * @param {TData} data
     * @returns {Promise<void>}
     * @memberof FileSystem
     */
    writeFile(id: TFileId, data: TData): Promise<void> {
        return new Promise((resolve, reject) => {
            this.wasmFs.fs.writeFile(id, data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            })
        });
    }

    /**
     * Creates a directory in the filesystem
     *
     * @param {TFilePath} path
     * @returns {Promise<void>}
     * @memberof FileSystem
     */
    makeDir(path: TFilePath, options?: TMode | IMkdirOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            this.wasmFs.fs.mkdir(path, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Reads a directory
     *
     * @param {TFilePath} path
     * @returns {(Promise<TDataOut[] | Dirent[]>)}
     * @memberof FileSystem
     */
    readDir(path: TFilePath, options?: FileSystemDirOptions): Promise<TDataOut[] | Dirent[]> {
        return new Promise((resolve, reject) => {
            this.wasmFs.fs.readdir(path, {
                encoding: options.encoding,
                withFileTypes: options.withFileTypes,
            }, (error, data) => {
                let result = data;

                if (error) {
                    return reject(error);
                }

                if (options && options.ignoreDotFiles) {
                    if (options.withFileTypes) {
                        // @ts-ignore
                        result = result.filter((folder: Dirent) => !folder.name.toString().startsWith('.'));
                    } else {
                        // @ts-ignore
                        result = result.filter(folder => !folder.startsWith('.'));
                    }
                }

                // @ts-ignore
                resolve(result);
            })
        });
    }

    /**
     * Creates a new instance of the FileSystem and init's the system
     *
     * @static
     * @param {Registry} registry
     * @returns
     * @memberof FileSystem
     */
    static async create(registry: Registry, provider: IKernelProvider) {
        const fs = new FileSystem(registry, provider);
        await fs.init();
        return fs;
    }
}

export default FileSystem;
