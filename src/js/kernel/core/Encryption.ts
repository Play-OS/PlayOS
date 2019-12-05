import keccak256 from "../services/createKeccakHash";

class Encryption {
    private seedHash: string;

    constructor(privateSeed: string) {
        this.seedHash = keccak256(privateSeed);
    }

    createKey(pkId: string): string {
        return keccak256(pkId + this.seedHash);
    }

    sign(pkId: string) {

    }

    encrypt(pkId: string, buffer: Buffer) {

    }

    decrypt(pkId: string, encryptedBuffer: Buffer) {

    }
}

export default Encryption;
