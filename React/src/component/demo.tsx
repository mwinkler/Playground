import React from 'react';
import { log } from '../decorator';
import { autobind } from 'core-decorators';

interface IDemo {
    name: string;
}

@log('Init Demo Component')
export class Demo extends React.Component<IDemo, any> {
    
    constructor(props: IDemo, context?: any) {
        super(props, context);
    }
    
    render() {
        return <div>Name: {this.props.name}</div>
    }
}

