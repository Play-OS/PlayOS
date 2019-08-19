export interface MultitaskStoreState {
    isOpen: boolean,
}

export enum MultitaskStoreActions {
    SET_MULTITASK_OPEN_STATE = 'SET_MULTITASK_OPEN_STATE'
}

const defaultState: MultitaskStoreState = {
    isOpen: false,
};

function MultitaskStore(state: MultitaskStoreState = defaultState, action: any) : MultitaskStoreState {
    if (action.type === MultitaskStoreActions.SET_MULTITASK_OPEN_STATE) {
        return {
            ...state,
            isOpen: action.payload.isOpen,
        }
    }

    return state;
}


export function setMultitaskOpen(isOpen: boolean) {
    return {
        type: MultitaskStoreActions.SET_MULTITASK_OPEN_STATE,
        payload: {
            isOpen,
        },
    }
}

export default MultitaskStore;
