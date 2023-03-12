<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
import Child from '../views/Child.vue'
import { ref } from 'vue';

const show = ref(true);
const count = ref(0);

onBeforeMount(() => {
    console.log('Parent component onBeforeMount')
})
onMounted(() => {
    console.log('Parent component onMounted');
    console.log(inputRef.value, 'inputRef');
    inputRef.value.focus();
});

onBeforeUpdate(() => {
    count.value++;
    console.log(count.value, 'count');
    console.log('Parent component onBeforeUpdate')
})
onUpdated(() => {
    console.log('Parent component onUpdated')
})
onBeforeUnmount(() => {
    console.log('Parent component onBeforeUnmount')
})
onUnmounted(() => {
    console.log('Parent component onUnmounted')
})

const toggle = () => {
    show.value = !show.value
}

const increment = () => {
    count.value++;
}




const inputRef = ref();

</script>

<template>
    <!-- <div>
        <button @click="toggle">Hide show button</button>
        <button @click="increment">Increment {{ count }}</button>
        <h1>Parenet </h1>
        <Child v-if="show" />
    </div> -->
    <div>
        <input type="text" ref="inputRef">
    </div>
</template>