import { setKernelLoading, setKernelAvailable } from './kernel';
import bootSystem from '../../services/bootSystem';
import KeyService from '../../services/KeyService';

export function bootKernelSystem() {
    return async (dispatch: Function) => {
        dispatch(setKernelLoading(true));

        await bootSystem(KeyService.keysFromStorage()!);

        dispatch(setKernelAvailable(true));
        dispatch(setKernelLoading(false));
    }
}
