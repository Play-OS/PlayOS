const store: any[] = [];

class InstanceBag {
    static set(key: string, value: any) {
        store[key] = value;
    }

    static get(key: string) {
        return store[key];
    }
}

export default InstanceBag;
