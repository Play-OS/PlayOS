import { setAuthLoading, setAuthRequestManifest } from "./auth";
import KeyService from "../../services/KeyService";
import { RegisterFormValues } from "../../services/RegisterService";
import { fetchAppInformationFromManifestUri } from "../../services/ApplicationService";
import { parseEncodedAuthRequest } from "../../services/AuthService";

export function authRegister(formValues: RegisterFormValues) {
    return async (dispatch: Function) => {
        dispatch(setAuthLoading(true));
        KeyService.saveKeys(formValues.keys);
        dispatch(setAuthLoading(false));

        window.location.href = '/#/home';
    }
}

export function loadAuthRequest() {
    return async (dispatch: Function) => {
        const url = new URL(window.location.href);
        const encodedAuthRequest = url.searchParams.get('authRequest');

        if (!encodedAuthRequest) {
            return;
        }

        const authRequest = parseEncodedAuthRequest(encodedAuthRequest);
        const manifestUri = new URL(authRequest.manifest_uri, authRequest.domain_name);
        const manifest = await fetchAppInformationFromManifestUri(manifestUri.href);

        dispatch(setAuthRequestManifest(manifest.data!));
    }
}
