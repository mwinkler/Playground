import React from 'react'
import TodoItem from './todo-item'

export default class TodoList extends React.Component<ITodoListProps, {}> {
    
    render() {
        return (
            <div>
                {this.props.items.map(item => 
                    <TodoItem key={item.id} item={item}></TodoItem>)}
            </div>
         )
    }
}