<script setup>
import { onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from 'vue';



onBeforeMount(() => {
    console.log('Child component onBeforeMount')
})
onMounted(()=> {
    console.log('child component onMounted')
});

onBeforeUpdate(() => {
    console.log('Child component onBeforeUpdate')
})
onUpdated(() => {
    console.log('Child component onUpdated')
})

onBeforeUnmount(() => {
    console.log('Child component onBeforeUnmount')
})
onUnmounted(() => {
    console.log('Child component onUnmounted')
})



</script>

<template>
    <div>
        Child component
    </div>
</template>