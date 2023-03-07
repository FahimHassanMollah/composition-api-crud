<script setup>
import { ref, watchEffect,onMounted } from "vue";
import useStudent from '../composables/studentApi'
import { useRoute } from 'vue-router';



const route = useRoute();
const {getStudent,err,student,updateStudent} = useStudent();

const studentData = ref({
    name:'',
    email:'',
});


onMounted(async()=> {
  await getStudent(route.params.id);
  console.log(student.value);
});


const updateStudentHandler = () => {
    if (student.value?.stuname && student.value?.email) {
        updateStudent(route.params.id,{stuname:student.value.stuname,email:student.value.email});
    }
}



// watchEffect(() => {
//     if (studentData.value.name) {
//         studentData.value.email = '';
//        studentData.value.name = ''; 
//     }
    
// })




</script>


<template>
  <div class="container py-4">
    <form @submit.prevent="updateStudentHandler">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          v-model="student.email"
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
        v-model="student.stuname"
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
