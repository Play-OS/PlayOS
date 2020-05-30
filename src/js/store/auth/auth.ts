import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Account } from '../../services/providers/IProvider';

export type AuthState = Readonly<{
    user?: Account;
    authError?: string;
    authLoginError?: string;
    authLoading: boolean;
}>;

const initialState: AuthState = {
    authError: undefined,
    authLoading: false,
    authLoginError: undefined,
    user: undefined,
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setAuthError(state: AuthState, action: PayloadAction<string | undefined>): AuthState {
            return {
                ...state,
                authError: action.payload,
            };
        },
        setAuthLoading(state: AuthState, action: PayloadAction<boolean>): AuthState {
            return {
                ...state,
                authLoading: action.payload,
            };
        },
        setAuthLoginError(state: AuthState, action: PayloadAction<string | undefined>): AuthState {
            return {
                ...state,
                authLoginError: action.payload,
            };
        },
        setAuthUser(state: AuthState, action: PayloadAction<Account>): AuthState {
            return {
                ...state,
                user: action.payload,
            };
        },
    },
});

export const {
    setAuthUser,
    setAuthError,
    setAuthLoading,
    setAuthLoginError,
} = authSlice.actions;

export default authSlice.reducer;
