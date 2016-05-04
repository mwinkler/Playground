import { Component, Input } from 'angular2/core';

@Component({
    selector: 'app-output',
    templateUrl: '/app/components/output.html'
})
export class OutputComponent { 
    
    @Input()
    Text: string;
    
}