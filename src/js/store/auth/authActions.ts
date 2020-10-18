import { setAuthLoading, setAuthRequestManifest, setAuthRequest, setAuthUser } from "./auth";
import KeyService from "../../services/KeyService";
import { RegisterFormValues } from "../../services/RegisterService";
import { fetchAppInformationFromManifestUri } from "../../services/ApplicationService";
import AuthService, { parseEncodedAuthRequest } from "../../services/AuthService";
import { AuthenticationResponse, AuthenticationErrors } from "../../models/Authentication";
import InstanceBag from "../../InstanceBag";
import Kernel from "../../../vendor/kernel";
import { Account } from '../../services/providers/IProvider';
import { Permission } from "../../models/Permission";

let targetMessagePort: MessageEventSource | null = null;

function postMessageOnTargetWindow(message: any, targetOrigin: string, transfer?: Transferable[]) {
    if (!targetMessagePort) {
        return;
    }

    // @ts-ignore
    targetMessagePort.postMessage(message, targetOrigin);
}

export function authRegister(formValues: RegisterFormValues) {
    return async (dispatch: Function) => {
        dispatch(setAuthLoading(true));
        KeyService.saveKeys(formValues.keys);
        dispatch(setAuthLoading(false));

        window.location.href = '/#/home';
    }
}

/**
 * Loads the logged in user (key that is in the storage)
 *
 * @export
 * @returns
 */
export function loadLoggedInUser() {
    return async (dispatch: Function) => {
        const kernel = InstanceBag.get<Kernel>('kernel');
        const userInfo = await AuthService.getAccountInfo(KeyService.keysFromStorage()!, kernel);

        dispatch(setAuthUser(userInfo));
    }
}

/**
 * Cancels the auth request currently loaded in
 *
 * @export
 * @returns
 */
export function cancelAuthRequest() {
    return async () => {
        window.close();
    }
}


/**
 * Approves the currently loaded in auth request
 *
 * @export
 * @returns
 */
export function approveAuthRequest(account: Account) {
    return async (dispatch: Function) => {
        const newNonce = account.nonce + 1;
        const keys = KeyService.keysFromStorage()!;
        const generatedKey = KeyService.createFromNonce(newNonce, keys);
        const response: AuthenticationResponse = {
            access_token: generatedKey.privateKey,
            token_type: 'bearer',
            scope: [Permission.StorageRead, Permission.StorageWrite],
            type: 'auth',
        }

        postMessageOnTargetWindow(response, '*');
    }
}

/**
 * Loads a authRequest used for the dialog where a user can choose to approve acces or deny it
 *
 * @export
 * @returns
 */
export function loadAuthRequest() {
    return async (dispatch: Function) => {
        const url = new URL(window.location.href);
        const encodedAuthRequest = url.searchParams.get('authRequest');

        window.addEventListener('message', (event) => {
            if (event.data === '💓') {
                targetMessagePort = event.source;
            }
        });

        if (!encodedAuthRequest) {
            const message: AuthenticationResponse = {
                error: AuthenticationErrors.InvalidRequest,
                error_description: 'Missing authRequest parameter',
                type: 'auth',
            };

            postMessageOnTargetWindow(message, '*');
            return;
        }

        const authRequest = parseEncodedAuthRequest(encodedAuthRequest);
        const manifestUri = new URL(authRequest.manifest_uri, authRequest.domain_name);
        const manifest = await fetchAppInformationFromManifestUri(manifestUri.href);

        dispatch(setAuthRequest(authRequest));
        dispatch(setAuthRequestManifest(manifest.data!));
    }
}
