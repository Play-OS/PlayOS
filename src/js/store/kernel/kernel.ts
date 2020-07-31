import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KernelState = Readonly<{
    kernelAvailable: boolean;
    kernelError?: string;
    kernelLoading: boolean;
}>;

const initialState: KernelState = {
    kernelError: undefined,
    kernelLoading: false,
    kernelAvailable: false,
};

const kernelSlice = createSlice({
    initialState,
    name: 'kernel',
    reducers: {
        setKernelError(state: KernelState, action: PayloadAction<string | undefined>): KernelState {
            return {
                ...state,
                kernelError: action.payload,
            };
        },
        setKernelLoading(state: KernelState, action: PayloadAction<boolean>): KernelState {
            return {
                ...state,
                kernelLoading: action.payload,
            };
        },
        setKernelAvailable(state: KernelState, action: PayloadAction<boolean>): KernelState {
            return {
                ...state,
                kernelAvailable: action.payload,
            };
        },
    },
});

export const {
    setKernelAvailable,
    setKernelError,
    setKernelLoading,
} = kernelSlice.actions;

export default kernelSlice.reducer;
