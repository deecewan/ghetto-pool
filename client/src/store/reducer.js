import { combineReducers } from 'redux';

import config from './config';
import journeys from './journeys';
import users from './users';

export default combineReducers({ config, journeys, users });
