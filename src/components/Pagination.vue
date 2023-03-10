<script setup>

import { reactive, computed, watch } from "vue";


const props = defineProps(['meta']);
const emits = defineEmits(['changePage']);
console.log(props, "props");


const changePageHandler = (pageString) => {
    console.log(pageString.split('?page='));
    emits('changePage', pageString.split('?page=')[1]);
}


</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li> -->
      <li v-for="(item,index) in meta?.links ?? []" :key="index" class="page-item">
        <button @click="changePageHandler(item.url)"  :disabled="item.active === true || item.url === null" class="page-link" >
            <span v-if="index === 0">prev</span>
            <span v-else-if="index === meta.links.length-1">next</span>
            <span v-else >{{ item.label }}</span>
        </button>
      </li>
     
      <!-- <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li> -->
    </ul>
  </nav>
</template>
