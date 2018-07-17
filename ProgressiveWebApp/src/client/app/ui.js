
import { postMessage, getMessages } from './api.js'

export function initUi() {

    console.log('Init ui');

    const app = new Vue({
        el: '#app',
        data: {
            isLoggedIn: false,
            username: '',
            message: '',
            messages: []
        },
        methods:{

            login: async () => {

                app.isLoggedIn = true;

                // load messages
                app.messages = await getMessages();
            },

            post: async () => {

                if (!app.message)
                    return;

                await postMessage(app.message, app.username);

                app.message = '';
            },

            isMyMessage: message => message.username.toLowerCase() === app.username.toLowerCase()
        }
    });

    

    //app.$refs.username.focus();
}
