
import * as react from 'react'
import * as reactDom from 'react-dom'
import { createStore } from 'redux'
import * as reducers from './reducers'

const store = createStore(reducers.Reducers);

store.subscribe(() => {
    console.log('Store changed', store.getState());
})

store.dispatch({ type: reducers.Actions.user.Fetch });
store.dispatch({ type: reducers.Actions.user.Add });
