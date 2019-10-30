import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';
import updateUserReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
// import reduxSaga from './event-saga';

import reduxSaga from './redux-saga';


const reduxSagaMiddleware = createSagaMiddleware();
const store = createStore(updateUserReducer, composeWithDevTools(
  applyMiddleware(reduxSagaMiddleware),
));

// const store = createStore(updateUserReducer, devToolsEnhancer(), applyMiddleware(sagaMiddleware));

reduxSagaMiddleware.run(reduxSaga);


export default store;