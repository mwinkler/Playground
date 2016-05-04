import React from 'react'
import ReactDom from 'react-dom'
import TodoList from './component/todo-list'
//import { Demo } from './component/demo';
//import { UserInput } from './component/user-input';

var items: ITodoItem[] = [
    { id: 1, done: false, name: 'Test 1' },
    { id: 2, done: false, name: 'Test 2' },
    { id: 3, done: true, name: 'Test 3' }
]

ReactDom.render(
    <TodoList items={items}></TodoList>,
    document.getElementById('app'));