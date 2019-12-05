import IKernelProvider from '../interfaces/IKernelProvider';

class BrowserProvider implements IKernelProvider {
    async setKeys(key: string) {

    }

    async storageGet(key: string) {
        return localStorage.getItem(key);
    }

    async storageSet(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    async fetchFile(id: string) {
        return Buffer.from(localStorage.getItem(id));
    }

    async storeFile(file: Buffer) {
        const fileId = Math.random().toString();
        localStorage.setItem(fileId, file.toString());
        return fileId;
    }
}

export default BrowserProvider;
