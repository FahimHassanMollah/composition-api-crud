<script setup>
import { ref, watchEffect } from "vue";


const studentData = ref({
    name:'',
    email:'',
});

const createStudentHandler = () => {
    console.log(studentData);
}



watchEffect(() => {
    if (studentData.value.name) {
        studentData.value.email = '';
       studentData.value.name = ''; 
    }
    
})




</script>


<template>
  <div class="container py-4">
    <form @submit.prevent="createStudentHandler">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          v-model="studentData.email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Name</label>
        <input
        v-model="studentData.name"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <br>
    <router-link :to="{name:'list'}"  class="btn btn-primary">Back to list</router-link>
  </div>
</template>
