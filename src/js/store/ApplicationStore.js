const defaultState = { apps: [] };
const currentState = defaultState;

function ApplicationStore(state = defaultState, action) {
    let newState = false;

    if (action.type === 'SET_APPS') {
        newState = true;
        currentState.apps = action.payload;
    }

    if (newState) return JSON.parse(JSON.stringify(currentState));

    return currentState;
}

export function setApps(payload) {
    return {
        type: 'SET_APPS',
        payload,
    };
}

export default ApplicationStore;
