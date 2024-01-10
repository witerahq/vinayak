// store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index'; // Combine your reducers here

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
