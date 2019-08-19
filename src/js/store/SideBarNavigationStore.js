const defaultState = { isOpen: false };

const currentState = JSON.parse(JSON.stringify(defaultState));

function SideBarNavigationStore(state = defaultState, action) {
    let newState = false;

    if (action.type === 'SET_SIDE_BAR_OPEN_STATE') {
        newState = true;
        currentState.isOpen = action.payload;
    }

    if (newState) return JSON.parse(JSON.stringify(currentState));

    return state;
}

export function setOpenSideBarNavigationState(open) {
    return {
        type: 'SET_SIDE_BAR_OPEN_STATE',
        payload: open,
    };
}

export default SideBarNavigationStore;
