import { Component } from 'angular2/core';
import { OutputComponent } from './components/output';
import { InputComponent } from './components/input';

@Component({
    selector: 'app-root',
    templateUrl: '/app/root.view.html',
    directives: [OutputComponent, InputComponent]
})
export class RootComponent { }