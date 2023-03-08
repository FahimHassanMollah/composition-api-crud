<script setup>
import { onMounted, ref,nextTick  } from 'vue';
import useStudent from '../composables/studentApi'
import AlertModal from '../views/AlertModal.vue'

const { getStudents, students, err, deleteStudent } = useStudent();

const myModal = ref(null);

const title = ref('Are you sure you want to delete this student?');
const alertModalData = ref({
  title: 'Are you sure you want to delete this student?',
  id: null
});

onMounted(async () => {
  await getStudents();
  console.log(students);
});

const openModal = async (id) => {
   myModal.value = new bootstrap.Modal(document.getElementById('alertModal'), {});
  alertModalData.value.id = id;
  await nextTick ();
  myModal.value.show();
}
const deleteStudentHandler = async (id) => {

  await deleteStudent(id);
}

const removeStudentResponseFromModal = async (data) => {
  if (data?.isRemoveTrue) {
    console.log(data, "response from modal");
    await deleteStudentHandler(data.id);
    myModal.value.hide();
  }
}

</script>

<template>
  <div class="container py-4">
    <router-link :to="{ name: 'add' }" class="btn btn-primary">Add</router-link>
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
        <tr v-for="({ stuname, email, id }, index) in students" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ stuname }}</td>
          <td>{{ email }}</td>
          <td>
            <router-link :to="{ name: 'view', params: { id } }" class="btn btn-sm btn-primary">View</router-link>
            <router-link :to="{ name: 'edit', params: { id: 1 } }" class="btn ms-1 btn-sm btn-primary">Edit</router-link>
            <button @click="openModal(id)" class="btn ms-1 btn-sm btn-primary">Delete {{ id }}</button>
          </td>
        </tr>

      </tbody>
    </table>
    <AlertModal :alertModalData="alertModalData" @remove-student="removeStudentResponseFromModal" />
  </div>
</template>
