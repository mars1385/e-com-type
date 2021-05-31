//import
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

//root reducer
import rootReducer from './rootReducers';
//saga
import rootSaga from './rootSagas';

const initialState = {};
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
//create store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
