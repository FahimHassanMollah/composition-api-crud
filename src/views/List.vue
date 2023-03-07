<script setup>
import { onMounted } from 'vue';
import useStudent from '../composables/studentApi'


const {getStudents,students,err} = useStudent();
const deleteStudentHandler = () => {
  // 
}

onMounted(async()=> {
 await getStudents();
  console.log(students);
});

</script>

<template>
  <div class="container py-4">
    <router-link :to="{name:'add'}" class="btn btn-primary">Add</router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({stuname,email,id},index) in students" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ stuname }}</td>
          <td>{{ email }}</td>
          <td>
            <router-link :to="{name:'view',params:{id}}" class="btn btn-sm btn-primary">View</router-link>
            <router-link :to="{name:'edit',params:{id:1}}" class="btn ms-1 btn-sm btn-primary">Edit</router-link>
            <button @click="deleteStudentHandler()" class="btn ms-1 btn-sm btn-primary">Delete</button>
          </td>
        </tr>
  
      </tbody>
    </table>
  </div>
</template>
