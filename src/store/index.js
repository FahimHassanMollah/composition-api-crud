
import { createStore } from 'vuex'
import {login} from '../store/login'

// Create a new store instance.
const store = createStore({
    modules: {
       login
      }
})


export default store;