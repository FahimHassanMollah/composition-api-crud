<script setup>
import { provide } from 'vue';
import User from './User.vue';

// provide('name');
</script>

<template>
    <div>
        Provide component
        <User name="fa"/>
    </div>
  
</template>