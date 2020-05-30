import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Listing } from '../../services/FileService';

export type FilesState = Readonly<{
    files: Listing[];
    error?: string;
    loading: boolean;
}>;

const initialState: FilesState = {
    files: [],
    loading: false,
    error: undefined,
};

const filesSlice = createSlice({
    initialState,
    name: 'files',
    reducers: {
        setFilesError(state: FilesState, action: PayloadAction<string | undefined>): FilesState {
            return {
                ...state,
                error: action.payload,
            };
        },
        setFilesLoading(state: FilesState, action: PayloadAction<boolean>): FilesState {
            return {
                ...state,
                loading: action.payload,
            };
        },
        setFiles(state: FilesState, action: PayloadAction<Listing[]>): FilesState {
            return {
                ...state,
                files: action.payload,
            };
        },
    },
});

export const {
    setFiles,
    setFilesError,
    setFilesLoading,
} = filesSlice.actions;

export default filesSlice.reducer;
