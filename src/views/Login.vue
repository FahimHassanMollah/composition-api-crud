<script setup>
import { reactive } from "vue";
import { useStore } from 'vuex';
import { computed } from 'vue'

// vuex  actions , getters  here
const store = useStore();
const authUser = computed(()=> store.getters['login/authUser']);
console.log(authUser, "authUser");
const isLoading = computed(()=> store.getters['login/isLoading']);
const isError = computed(()=> store.getters['login/isError']);
const error = computed(()=> store.getters['login/error']);



const loginData = reactive({
    email: '',
    password: ''
});

const loginHandler = async () => {
   await store.dispatch('login/login', {username: loginData.email, password: loginData.password});
   console.log(authUser, "authUser");

}
</script>

<template>
    <div class="container py-4">
        <form @submit.prevent="loginHandler">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="loginData.email" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="loginData.password" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">Submit</button>
        </form>
    </div>
</template>