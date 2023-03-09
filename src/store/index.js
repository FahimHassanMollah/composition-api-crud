
import { createStore } from 'vuex'
import {login} from '../store/login'
import {appointments} from '../store/appointments'

// Create a new store instance.
const store = createStore({
    modules: {
       login,
       appointments
      }
})


export default store;