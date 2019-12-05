export default interface IKernelProvider {
    setKeys(keys: string): Promise<void>;

    storageSet(key: string, value: string): Promise<void>;
    storageGet(key: string): Promise<string>;

    storeFile(data: Buffer): Promise<string>;
    fetchFile(id: string): Promise<Buffer>;
}
