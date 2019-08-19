import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

// Stores
import ExampleStore from './ExampleStore';
import SnackBarMessageStore from './SnackBarMessageStore';
import UserInfoStore from './UserInfoStore';
import AppCanvasStore from './AppCanvasStore';
import SideBarNavigationStore from './SideBarNavigationStore';
import ApplicationStore from './ApplicationStore';
import MultitaskStore from './MultitaskStore';

// Enhance our redux store with redux dev tools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunk));

// Lastly combine all reducers
const reducers = combineReducers({
    ExampleStore,
    routing: routerReducer,
    SnackBarMessageStore,
    UserInfoStore,
    AppCanvasStore,
    SideBarNavigationStore,
    ApplicationStore,
    MultitaskStore,
});

// And create our store
const store = createStore(reducers, middleware);

export default store;
