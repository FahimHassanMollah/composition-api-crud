import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';
import '../src/assets/main.css';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
console.log(import.meta.env.VITE_APP_API_URL);
axios.defaults.headers.common['Client-Secret'] = import.meta.env.VITE_APP_CLIENT_SECRET;
const app = createApp(App);


store.subscribe((mutation, state) => {

    if (mutation.type === 'login/setAuthToken') {
     
            let tokenType = mutation.payload?.token_type ?? null;
            let accessToken = mutation.payload?.access_token ?? null;

            if (tokenType && accessToken) {
                axios.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`;
                localStorage.setItem('authToken', JSON.stringify(mutation.payload));             
            }
            else {
                axios.defaults.headers.common['Authorization'] = null;
                localStorage.removeItem('authToken');
            }
        
        
    }
    if (mutation.type === 'login/setAuthUser') {
     
            let authId = mutation.payload?.id ?? null;
         

            if (authId) {
              
                localStorage.setItem('authUser', JSON.stringify(mutation.payload));             
            }
            else {
              
                localStorage.removeItem('authUser');
            }
        
        
    }

})


app.use(router);
app.use(store);

app.mount('#app');
