import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParsedApplicationInfo } from '../../../vendor/kernel/core/WasmParser';

export type AppsState = Readonly<{
    apps: any[];
    appsError?: string;
    appsLoading: boolean;
}>;

const initialState: AppsState = {
    appsError: undefined,
    appsLoading: false,
    apps: [],
};

const appsSlice = createSlice({
    initialState,
    name: 'apps',
    reducers: {
        setAppsError(state: AppsState, action: PayloadAction<string | undefined>): AppsState {
            return {
                ...state,
                appsError: action.payload,
            };
        },
        setAppsLoading(state: AppsState, action: PayloadAction<boolean>): AppsState {
            return {
                ...state,
                appsLoading: action.payload,
            };
        },
        setApps(state: AppsState, action: PayloadAction<ParsedApplicationInfo[]>): AppsState {
            return {
                ...state,
                apps: action.payload,
            };
        },
    },
});

export const {
    setApps,
    setAppsError,
    setAppsLoading,
} = appsSlice.actions;

export default appsSlice.reducer;
