import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';

// Stores
import SnackBarMessageStore from './SnackBarMessageStore';
import UserInfoStore from './UserInfoStore';
import AppProcessesStore from './AppProcessesStore';
import SideBarNavigationStore from './SideBarNavigationStore';
import ApplicationStore from './applications/applicationStore';
import MultitaskStore from './MultitaskStore';
import auth, { AuthState } from './auth/auth';
import apps, { AppsState } from './apps/apps';
import kernel, { KernelState } from './kernel/kernel';
import files, { FilesState } from './files/files';

export interface Reducers {
    auth: AuthState,
    apps: AppsState,
    kernel: KernelState,
    files: FilesState,
}

export const history = createHashHistory();

// Enhance our redux store with redux dev tools.
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createRootReducers = (history: any) => combineReducers({
    router: connectRouter(history),
    SnackBarMessageStore,
    UserInfoStore,
    AppProcessesStore,
    SideBarNavigationStore,
    ApplicationStore,
    MultitaskStore,
    auth,
    apps,
    kernel,
    files,
});

// And create our store
const store = createStore(
    createRootReducers(history),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        ),
    ),
);

export default store;
