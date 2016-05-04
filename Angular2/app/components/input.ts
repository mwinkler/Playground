import { Component } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';

@Component({
    selector: 'app-input',
    templateUrl: '/app/components/input.html',
    directives: [FORM_DIRECTIVES]
})
export class InputComponent { 
    
    Text: string;
    
}