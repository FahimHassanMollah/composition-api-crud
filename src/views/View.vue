<script setup>
import { onMounted, ref, watchEffect } from "vue";
import useStudent from '../composables/studentApi'
import { useRoute } from 'vue-router';

const route = useRoute();
const {getStudent,err,student} = useStudent();


onMounted(async()=> {
  await getStudent(route.params.id);
  console.log(student.value);
});
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
    <h1>View Student</h1>
    <h4>{{ student?.stuname  ?? ''}}</h4>
    <h4>{{ student?.email  ?? ''}}</h4>
    <br>
    <router-link :to="{name:'list'}"  class="btn btn-primary">Back to list</router-link>
  </div>
</template>
