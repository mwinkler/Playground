
import * as react from 'react'
import * as reactDom from 'react-dom'
import { createStore } from 'redux'
import * as reducers from './reducers'

const store = createStore(reducers.Reducers);

store.subscribe(() => {
    console.log('Store changed', store.getState());
})

store.dispatch({
    type: reducers.Actions.users.Add,
    user: { id: 1, name: 'Test' }
});

store.dispatch({
    type: reducers.Actions.current.SetUset,
    user: store.getState().users[0]
});
