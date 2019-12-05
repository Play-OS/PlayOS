import IKernelProvider from '../interfaces/IKernelProvider';

class Registry {
    // Cache for the registry so we don't have to keep fetching from the provider
    private registry: any;
    private provider: IKernelProvider;

    constructor(values: any = {}, provider: IKernelProvider) {
        this.registry = values;
        this.provider = provider;
    }

    /**
     * Sets a value in the registry
     *
     * @param {string} key
     * @param {*} value
     * @param {boolean} temp Whether you want to store the registry item on the provider
     * @memberof Registry
     */
    async set(key: string, value: any, temp: boolean = true) {
        this.registry[key] = value;

        if (!temp) {
            await this.provider.storageSet(key, value);
        }
    }

    /**
     * Gets an item from the registry
     *
     * @template T The type from the registry
     * @param {string} key The key you want to get
     * @returns {T}
     * @memberof Registry
     */
    async get<T>(key: string): Promise<T> {
        if (this.registry[key]) {
            return this.registry[key];
        }

        const value: any = this.provider.storageGet(key);
        return value;
    }
}

export default Registry;
