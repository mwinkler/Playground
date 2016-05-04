import React from 'react';

export default class TodoItem extends React.Component<ITodoItemProps, {}> {
    
    onTextChange() {
        
    }
    
    render() {
        return (
            <div>
                <input type="checkbox" checked={this.props.item.done} onChange={this.onTextChange.bind(this)} />                
                <span>{ this.props.item.name }</span>
            </div>
        )
    }
}