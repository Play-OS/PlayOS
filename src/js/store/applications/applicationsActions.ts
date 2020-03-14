import { ApplicationStoreActions } from './applicationStore';
import UserService from '../../services/UserService';
import Application from '../../models/Application';

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
            dispatch({
                type: ApplicationStoreActions.APPLICATION_STORE_PENDING,
            });

            const apps = await UserService.getInstalled();

            dispatch({
                type: ApplicationStoreActions.APPLICATION_STORE_FULFILLED,
                payload: apps,
            });
        } catch (error) {
            dispatch({
                type: ApplicationStoreActions.APPLICATION_STORE_REJECTED,
                payload: error,
            });
        }
    };
}

export function setApps(payload: Application[]) {
    return {
        type: 'SET_APPS',
        payload,
    };
}


export function addSingleApplication(app: Application) {
    return {
        type: ApplicationStoreActions.ADD_SINGLE_APPLICATION,
        payload: app,
    };
}
