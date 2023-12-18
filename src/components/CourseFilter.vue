<template>
    <nav class="filter">
        <button
            v-for="f in filters"
            :key="f.name"
            class="filter-button"
            @click="$emit('change-filter', f.name)"
        >
            {{ f.text }}
        </button>
    </nav>

    <div class="loading" v-if="isLoading">Loading courses...</div>
    <slot v-else></slot>
</template>

<script>
import CourseList from './CoursesList.vue';

export default {
    components: {
        CourseList
    },
    props: ['isLoading', 'filter', 'filters'],
    emits: ['change-filter']
}
</script>

<style scoped>
.filter {
    width: 640px;
    margin: 10px auto;
    text-align: right;
}

.filter-button {
    display: inline-block;
    margin-left: 10px;
    background: #fff;
    border: 2px solid #555;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8;
    font-size: 1em;
}

.loading {
    max-width: 640px;
    border: 1px solid #ffd859;
    background: #ffe9a0;
    color: #3a3a3a;
    padding: 5px 0;
    text-align: center;
    margin: 30px auto;
}
</style>