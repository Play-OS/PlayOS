import Application from "../models/Application";

export interface Process {
    app: Application;
    minimized: boolean;
    id: number;
}

export interface OpenProcess {
    appId: string;
    processId: number;
}

export interface AppProcessesState {
    processes: Process[];
    openProcesses: OpenProcess[];
    focussedProcessId: number;
    heighestZIndex: number;
}

interface Action {
    type: ActionTypes;
    payload: any;
}

enum ActionTypes {
    OPEN_APP = 'OPEN_APP',
    CLOSE_APP = 'CLOSE_APP',
    KILL_PROCESS = 'KILL_PROCESS',
    SET_HEIGHEST_Z_INDEX = 'SET_HEIGHEST_Z_INDEX',
}

const defaultState: AppProcessesState = {
    processes: [],
    openProcesses: [],
    focussedProcessId: 0,
    heighestZIndex: 1,
};

function AppProcessesStore(state = defaultState, action: Action): AppProcessesState {
    let newState = false;

    if (action.type === ActionTypes.OPEN_APP) {
        const app: Application = action.payload;
        // For the MVP we do not allow multiple processes of the same app.
        const isInMemory = state.processes.find(process => process.app.id === app.id);
        const isOpen = state.openProcesses.find(openProcess => openProcess.appId === app.id);
        const processes = state.processes;
        const openProcesses = state.openProcesses;
        const processId = state.processes.length + 1;

        if (!isInMemory) {
            processes.push({
                app,
                id: processId,
                minimized: false,
            });
        }

        if (!isOpen) {
            openProcesses.push({
                appId: app.id,
                processId,
            })
        }

        return {
            ...state,
            processes,
            openProcesses,
            focussedProcessId: processId,
        };
    } else if (action.type === ActionTypes.KILL_PROCESS) {
        const processId: number = action.payload;
        const processIndex = state.processes.findIndex(process => process.id === processId);
        const openProcessIndex = state.openProcesses.findIndex(process => process.processId === processId);

        state.processes.splice(processIndex, 1);
        state.openProcesses.splice(openProcessIndex, 1);

        return {
            ...state,
            processes: state.processes,
            openProcesses: state.openProcesses,
        };
    } else if (action.type === ActionTypes.CLOSE_APP) {
        const processId: number = action.payload;
        const openProcessIndex = state.openProcesses.findIndex(process => process.processId === processId);
        const openProcesses = state.openProcesses.splice(openProcessIndex, 1);

        return {
            ...state,
            openProcesses,
        }
    } else if (action.type === ActionTypes.SET_HEIGHEST_Z_INDEX) {
        return {
            ...state,
            heighestZIndex: action.payload,
        }
    }

    return state;
}

export function setHeighestZIndex(zIndex: number) {
    return {
        type: ActionTypes.SET_HEIGHEST_Z_INDEX,
        payload: zIndex,
    };
}

export function openApp(app: Application) {
    return {
        type: ActionTypes.OPEN_APP,
        payload: app,
    };
}

export function closeApp(processId: number) {
    return {
        type: ActionTypes.CLOSE_APP,
        payload: processId,
    };
}

export function killProcess(processId: number) {
    return {
        type: ActionTypes.KILL_PROCESS,
        payload: processId,
    };
}

export default AppProcessesStore;
