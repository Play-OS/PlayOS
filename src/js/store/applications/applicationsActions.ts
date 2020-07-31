import { ApplicationStoreActions } from './applicationStore';
import UserService from '../../services/UserService';
import Application from '../../models/Application';

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
