
import data from './assets/data.json'
import './style.css'
import $ from 'jquery'
import '@fortawesome/fontawesome-free-webfonts';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';

console.log('Hello');

$('body').append(`<h1>Hi ${data.Name} <i class="fa fa-battery-empty"></i></h1>`);
$('body').append('<div class="demo"></div>');

console.log(data);
//$('body').load(view);

