import {combineReducers} from 'redux';
import {reducer as configReducer} from './configuration';

export const reducer = combineReducers({
  configuration: configReducer,
});
