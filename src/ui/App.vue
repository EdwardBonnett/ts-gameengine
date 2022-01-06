<script setup lang="ts">
import Message from './message.vue';

</script>

<template>
    <message msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vmin;
    height: 100vmin;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
