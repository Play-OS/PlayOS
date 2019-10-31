const store: any[] = [];

class InstanceBag {
    static set(key: string, value: any) {
        store[key] = value;
    }

    static get<T>(key: string): T {
        return store[key];
    }
}

export default InstanceBag;
