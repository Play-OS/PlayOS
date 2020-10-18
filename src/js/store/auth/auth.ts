import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Account } from "../../services/providers/IProvider";
import { ApplicationViewModel } from '../../models/Application';
import { AuthenticationRequest } from "../../models/Authentication";

export type AuthState = Readonly<{
    user?: Account;
    authError?: string;
    authRequest?: AuthenticationRequest;
    authLoginError?: string;
    authRequestManifest?: ApplicationViewModel;
    authLoading: boolean;
}>;

const initialState: AuthState = {
    authError: undefined,
    authLoading: false,
    authLoginError: undefined,
    authRequest: undefined,
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
        setAuthError(
            state: AuthState,
            action: PayloadAction<string | undefined>
        ): AuthState {
            return {
                ...state,
                authError: action.payload,
            };
        },
        setAuthLoading(
            state: AuthState,
            action: PayloadAction<boolean>
        ): AuthState {
            return {
                ...state,
                authLoading: action.payload,
            };
        },
        setAuthLoginError(
            state: AuthState,
            action: PayloadAction<string | undefined>
        ): AuthState {
            return {
                ...state,
                authLoginError: action.payload,
            };
        },
        setAuthUser(
            state: AuthState,
            action: PayloadAction<Account>
        ): AuthState {
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
    setAuthRequestManifest,
    setAuthRequest,
} = authSlice.actions;

export default authSlice.reducer;
