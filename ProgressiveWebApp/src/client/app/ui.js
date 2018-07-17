
import { postMessage } from './api.js'

export function initUi() {

    console.log('Init ui');

    const app = new Vue({
        el: '#app',
        data: {
            isLoggedIn: false,
            username: ''
        },
        methods:{

            login: () => {

                app.isLoggedIn = true;
            },

            post: async () => {

                await postMessage();
            }
        }
    });

    //app.$refs.username.focus();
}
