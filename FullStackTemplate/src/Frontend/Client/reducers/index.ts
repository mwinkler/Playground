
import { createStore, combineReducers } from 'redux'
import * as user from './users'

export const Reducers = combineReducers({
    users: user.Reducer
});

export const Actions = {
    user: user.Actions
};