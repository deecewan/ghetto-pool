import { combineReducers } from 'redux';

import config from './config';
import journeys from './journeys';

export default combineReducers({ config, journeys });
