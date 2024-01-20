<template>
    <div>
        <b-button @click="modalShow = !modalShow">
            Open Modal
        </b-button>

        <b-modal v-model="modalShow">
            Hello From Modal!
        </b-modal>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        const modalShow = ref(true);

        return {
            modalShow
        }
    }
}
</script>