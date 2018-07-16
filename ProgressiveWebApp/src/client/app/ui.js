
import { postMessage } from './api.js'

export function initUi() {

    console.log('Init ui');

    const app = new Vue({
        el: '#app',
        methods:{

            push: async () => {

                await postMessage();
            }
        }
    });  
}
