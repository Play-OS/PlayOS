import { Permission } from "./Permission";

export interface AuthenticationRequest {
    domain_name: string;
    manifest_uri: string;
    redirect_uri: string;
    version: string;
    scopes: Permission[];
}

export enum AuthenticationErrors {
    InvalidRequest = 'invalid_request',
    AccessDenied = 'access_denied',
    UnauthorizedClient = 'unauthorized_client',
    UnsupportedResponseType = 'unsupported_response_type',
    InvalidScope = 'invalid_scope',
    ServerError = 'server_error',
    TemporarilyUnavailable = 'temporarily_unavailable',
}

export interface AuthenticationResponse {
    error?: AuthenticationErrors;
    error_description?: string;
    error_uri?: string;

    access_token?: string;
    token_type?: 'bearer';
    expires_in?: string;
    scope?: Permission[];
    type: 'auth',
}
