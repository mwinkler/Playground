import React from 'react'
import ReactDom from 'react-dom'
//import * as MaterialUi from 'material-ui'

import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
//import test from 'material-ui/'

// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin();

var onClick = () => {
    
    debugger;
}

ReactDom.render(
    <div>
        <AppBar title="Hello" showMenuIconButton={false}>
        </AppBar>
        <RaisedButton label="Default" onMouseUp={onClick} />
    </div>,
    document.getElementById('app'));