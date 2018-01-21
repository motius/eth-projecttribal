import {combineReducers} from 'redux';
import {reducer as configReducer} from './configuration';
import {reducer as fanclubReducer} from './fanclub';
import {reducer as routeReducer} from './routes';
import {reducer as votesReducer} from './votes';

export const reducer = combineReducers({
  configuration: configReducer,
  fanclub: fanclubReducer,
  routes: routeReducer,
  votes: votesReducer,
});
