import {combineReducers} from 'redux';
import {reducer as configReducer} from './configuration';
import {reducer as routeReducer} from './routes';

export const reducer = combineReducers({
  configuration: configReducer,
  routes: routeReducer,
});
