const defaultState = 0;

function ExampleStore(state = defaultState, action) {
    if (action.type === 'EXAMPLE_ADD_ONE') {
        return state + 1;
    }

    return state;
}

export default ExampleStore;
