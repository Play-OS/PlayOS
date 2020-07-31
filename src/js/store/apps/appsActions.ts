import { setAppsLoading, setAppsError, setApps } from "./apps";
import UserService from "../../services/UserService";

/**
 * Loads the applications that where installed by the private key holder
 * These all come from the blockchain
 *
 * @export
 * @returns
 */
export function loadApps() {
    return async (dispatch: Function) => {
        try {
            dispatch(setAppsLoading(true));

            const apps = await UserService.getInstalled();
            dispatch(setApps(apps));

            dispatch(setAppsLoading(false));
        } catch (error) {
            dispatch(setAppsError(error));
        }
    };
}
