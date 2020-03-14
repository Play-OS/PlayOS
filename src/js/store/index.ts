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
});

// Lastly combine all reducers
// const reducers = combineReducers({
//     ExampleStore,
//     routing: routerReducer,
//     SnackBarMessageStore,
//     UserInfoStore,
//     AppProcessesStore,
//     SideBarNavigationStore,
//     ApplicationStore,
//     MultitaskStore,
// });

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
