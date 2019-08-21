import Application from "../models/Application";
import UserService from "../services/UserService";
import KeyService from "../services/KeyService";

export interface ApplicationStoreState {
    apps: Application[];
    loading: boolean;
    errors: object;
}

const defaultState: ApplicationStoreState = {
    apps: [],
    loading: false,
    errors: {},
};

export enum ApplicationStoreActions {
    APPLICATION_STORE_FULFILLED = 'APPLICATION_STORE_FULFILLED',
    APPLICATION_STORE_PENDING = 'APPLICATION_STORE_PENDING',
    APPLICATION_STORE_REJECTED = 'APPLICATION_STORE_REJECTED',
}

function ApplicationStore(state = defaultState, action: any): ApplicationStoreState {
    if (action.type === ApplicationStoreActions.APPLICATION_STORE_FULFILLED) {
        return {
            ...state,
            apps: action.payload,
            loading: false,
            errors: {},
        }
    } else if (action.type === ApplicationStoreActions.APPLICATION_STORE_PENDING) {
        return {
            ...state,
            apps: [],
            loading: true,
            errors: {},
        }
    } else if (action.type === ApplicationStoreActions.APPLICATION_STORE_REJECTED) {
        return {
            ...state,
            loading: false,
            errors: action.payload,
        }
    }

    return state;
}

export function setApps(payload: Application[]) {
    return {
        type: 'SET_APPS',
        payload,
    };
}

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

            const privateKey = KeyService.keysFromStorage();
            const apps = await UserService.getInstalled(privateKey);

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
    }
}

export default ApplicationStore;
