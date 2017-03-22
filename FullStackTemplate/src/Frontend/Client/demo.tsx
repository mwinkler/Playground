
import * as ReactDom from 'react-dom';
import * as React from 'react';
//import 'roboto-fontface';

import TestView from './views/view1';

document.querySelector('body').innerHTML = '<app></app>'

ReactDom.render(
    <TestView Title="Meine Komponente"></TestView>,
    document.querySelector('app')
)
