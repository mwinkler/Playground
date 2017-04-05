
import { combineReducers } from 'redux'
import * as user from './users'
import * as current from './current'

export const Reducers = combineReducers({
    users: user.Reducer,
    current: current.Reducer
});

export const Actions = {
    users: user.Actions,
    current: current.Actions
};