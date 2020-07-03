import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Account } from '../../services/providers/IProvider';
import { ApplicationViewModel } from '../../models/Application';
import { AuthenticationRequest } from '../../models/Authentication';

export type AuthState = Readonly<{
    user?: Account;
    authRequestManifest?: ApplicationViewModel;
    authRequest?: AuthenticationRequest;
    authError?: string;
    authLoginError?: string;
    authLoading: boolean;
}>;

const initialState: AuthState = {
    authError: undefined,
    authRequest: undefined,
    authLoading: false,
    authLoginError: undefined,
    user: undefined,
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setAuthRequest(state: AuthState, action: PayloadAction<AuthenticationRequest>): AuthState {
            return {
                ...state,
                authRequest: action.payload,
            }
        },
        setAuthRequestManifest(state: AuthState, action: PayloadAction<ApplicationViewModel>): AuthState {
            return {
                ...state,
                authRequestManifest: action.payload,
            }
        },
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
    setAuthRequest,
    setAuthUser,
    setAuthError,
    setAuthLoading,
    setAuthLoginError,
    setAuthRequestManifest,
} = authSlice.actions;

export default authSlice.reducer;
