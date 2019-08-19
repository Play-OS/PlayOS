const defaultState = { openApps: [], currentlyOpen: {}, currentlyOpenSettings: {}, state: 'closed' };
const currentState = defaultState;

function AppCanvasStore(state = defaultState, action) {
    let newState = false;

    if (action.type === 'OPEN_APP') {
        const isInMemory = currentState.openApps.find(app => app.id === action.payload.id);

        // When the app is not currently in memory we can add it to our openApps
        if (!isInMemory) {
            currentState.openApps.push(action.payload);
        }

        currentState.currentlyOpen = action.payload;
        currentState.currentlyOpenSettings = action.payload.properties;
        currentState.state = 'open';

        newState = true;
    } else if (action.type === 'CLOSE_APP') {
        currentState.state = 'closed';
        newState = true;
    } else if (action.type === 'KILL_APP') {
        const memoryIndex = currentState.openApps.findIndex(app => app.id === action.payload.id);
        currentState.openApps.splice(memoryIndex, 1);
        newState = true;
    } else if (action.type === 'RESET_CURRENTLY_OPEN_APP') {
        currentState.currentlyOpen = {};
        currentState.currentlyOpenSettings = {};
        newState = true;
    } else if (action.type === 'OVERWRITE_CURRENTLY_OPEN_SETTINGS') {
        currentState.currentlyOpenSettings = action.payload;
        newState = true;
    } else if (action.type === 'OPEN_APP_IN_BACKGROUND') {
        const isInMemory = currentState.openApps.find(app => app.id === action.payload.id);

        // Only add the apps to the background if it's not already in the background
        if (!isInMemory) {
            currentState.openApps.push(action.payload);
        }

        newState = true;
    }

    if (newState) return JSON.parse(JSON.stringify(currentState));

    return currentState;
}

export function openApp(app) {
    return {
        type: 'OPEN_APP',
        payload: app,
    };
}

export function closeApp() {
    return {
        type: 'CLOSE_APP',
    };
}

export function killApp(app) {
    return {
        type: 'KILL_APP',
        payload: app,
    };
}

export function resetCurrentlyOpen() {
    return {
        type: 'RESET_CURRENTLY_OPEN_APP',
    };
}

export function overwriteCurrentlyOpenSettings(settings) {
    return {
        type: 'OVERWRITE_CURRENTLY_OPEN_SETTINGS',
        payload: settings,
    };
}

export function openAppInBackground(app) {
    return {
        type: 'OPEN_APP_IN_BACKGROUND',
        payload: app,
    };
}


export default AppCanvasStore;
