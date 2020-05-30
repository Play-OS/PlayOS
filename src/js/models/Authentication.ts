import { Permission } from "./Permission";

export interface AuthenticationRequest {
    domain_name: string;
    manifest_uri: string;
    redirect_uri: string;
    version: string;
    scopes: Permission[];
}
