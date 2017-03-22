
//import 'font-awesome/css/font-awesome.css'
import './components/demo1/demo'
import axios from 'axios'
//import * as $ from 'jquery'

//$(document.body).append('<demo-1>My Tag</demo-1>');
document.body.innerHTML = `<demo-1></demo-1>`;

console.log('ready');

async function fetch() {

    let response = await axios.get('/api/home/users');

    var user = response.data as Frontend.User[];


}

fetch();