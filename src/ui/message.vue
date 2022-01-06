<template>
    <div class="message" v-if="message">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ServiceAccessor } from '../services/serviceAccessor';

const message = ref('');
const serviceAccessor = new ServiceAccessor();
serviceAccessor.services.UI.subscribeEvent('me', 'message', (text: string) => {
    message.value = text;
});

</script>

<style scoped>
    .message {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row: 4;
        background: #333;
        padding: 1rem;
        color: #fff;
        opacity: 0.8;
    }
</style>
