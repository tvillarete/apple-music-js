import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import viewReducer from './views/reducer';
import apiReducer from './api/reducer';
import audioReducer from './audio/reducer';
import navReducer from './components/bar/reducer';

const rootReducer = combineReducers({
   viewState: viewReducer,
   apiState: apiReducer,
   audioState: audioReducer,
   navState: navReducer,
});

const store = createStore(
   rootReducer,
   devToolsEnhancer(),
   applyMiddleware(thunkMiddleware),
);

export default store;
