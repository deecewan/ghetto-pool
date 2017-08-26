import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {}; // { config: { loggedIn: true } }

export default createStore(reducer, initialState);
