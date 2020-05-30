import { PrivateKey } from "./providers/IProvider";

export interface RegisterFormValues {
    keys: PrivateKey;
    username: string;
}
