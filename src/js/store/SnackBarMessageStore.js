const defaultState = { message: '', autoHideDuration: null };

const currentState = defaultState;

function GroupStore(state = defaultState, action) {
    let newState = false;

    if (action.type === 'SET_SNACKBAR_MESSAGE') {
        newState = true;
        currentState.message = action.payload.message;
        currentState.autoHideDuration = action.payload.autoHideDuration;
    }

    if (newState) return JSON.parse(JSON.stringify(currentState));

    return state;
}

export default GroupStore;
