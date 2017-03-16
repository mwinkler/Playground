
import * as React from 'react';
import { AppBar } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

interface IView1State {
    Title: string;
}

interface IView1Props {
    Title?: string;
}

export default class View1 extends React.Component<IView1Props, IView1State> {

    constructor(props: IView1Props) {
        super(props);
        this.state = {
            Title: 'Hello React'
        }
    }

    click() {
        //this.state.Title = 'your clicked';
        this.setState(state => {
            state.Title += ' click';
            return state;
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.Title} {this.state.Title}</h1>
                <button onClick={() => this.click()}>Klick mich</button>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <AppBar title={this.state.Title}></AppBar>
                </MuiThemeProvider>
            </div>
        )
    }
}