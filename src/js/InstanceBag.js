const store = [];

class InstanceBag {
    static set(key, value) {
        store[key] = value;
    }

    static get(key) {
        return store[key];
    }
}

export default InstanceBag;
