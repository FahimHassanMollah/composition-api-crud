<script setup>
import { inject } from "vue";

// const nameInject = inject("name","default value");
const nameInject = inject("name", () => "default value", true);
const props = defineProps(['name']);
</script>

<template>
    <div>
        <h1> using props {{ name }}</h1>
        <h1> using inject {{ nameInject }}</h1>
       
        Guest component
    </div>
</template>