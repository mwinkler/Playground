import React from 'react';
import { autobind, throttle, debounce } from 'core-decorators';

interface IProperties {
    name: string;
}

interface IStates {
    name: string;
}

export class UserInput extends React.Component<IProperties, IStates> {
    
    constructor(props: IProperties, context?: any) {
        super(props, context);
        
        this.state = {
            name: 'NEW'
        };
    }
    
    //@autobind
    //@debounce
    onChange(e: React.FormEvent) {
        this.setState({
            name: (e.target as any).value
        });
    }
    
    render() {
        return <div>                
            Name: <input type="textbox" onChange={this.onChange.bind(this)} value={this.state.name} /> {this.state.name}
        </div>
    }
}