import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const initialState = {}; // { config: { loggedIn: true } }
console.log(process.env.NODE_ENV === 'development')
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
console.log(compose);
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(require('./reducer').default);
  });
}

export default store;
