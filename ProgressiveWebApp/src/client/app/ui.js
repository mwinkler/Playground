
import { postMessage, getMessages } from './api.js'
import { registerUser, getUser } from './service.js'

export async function initUi() {

    console.log('Init ui');

    const app = new Vue({
        el: '#app',
        data: {
            username: '',
            message: '',
            messages: [],
            user: getUser()
        },
        methods:{

            login: async () => {

                try {
                    app.user = await registerUser(app.username);
                } 
                catch (error) {
                    alert(error);
                }
            },

            post: async () => {

                if (!app.message)
                    return;

                await postMessage(app.message, app.user.id);

                app.message = '';
            },

            isMyMessage: message => message.username.toLowerCase() === app.user.name.toLowerCase()
        }
    });

    // load messages
    app.messages = await getMessages();

    //app.$refs.username.focus();
}
