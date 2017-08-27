import { combineReducers } from 'redux';

import config from './config';
import journeys from './journeys';
import locations from './locations';
import trips from './trips';
import users from './users';

export default combineReducers({ config, journeys, locations, trips, users });
