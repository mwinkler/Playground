import './demo.scss'
//import img from './demo.png'
import template from './demo.html'

//document.registerElement('demo-1');
document.addEventListener('DOMContentLoaded', () => {

    var nodes = document.querySelectorAll('demo-1') as any as Element[];

    nodes.forEach(node => {
        node.innerHTML = template;
    });
})

console.log('demo-1 registered');
