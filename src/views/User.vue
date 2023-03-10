<script setup>
import Guest from './Guest.vue';

const props = defineProps(['name']);
</script>

<template>
    <div>
        user component
        <Guest :name="name"/>
    </div>
</template>