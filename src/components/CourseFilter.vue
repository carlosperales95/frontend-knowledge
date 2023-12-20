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
    <div class="empty-message" v-else-if="!courses || courses.length === 0">
        You have no courses in your knowledge base yet. Start adding them!
        <router-link class="router-button" to="/courses/new"> Add Course</router-link>
    </div>
    <slot v-else></slot>
</template>

<script>
import CourseList from './CoursesList.vue';

export default {
    components: {
        CourseList
    },
    props: ['isLoading', 'filter', 'filters', 'courses'],
    emits: ['change-filter'],
    // setup(props) {
    //     console.log(props.courses);
    // }
}
</script>

<style scoped>
.filter {
    width: 640px;
    margin: 0.8rem auto;
    text-align: left;
}

.filter-button {
    display: inline-block;
    margin-right: 15px;
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

.router-button {
    background-color: #ffd859;
    padding: 1rem;
    text-decoration: none;
    border-radius: 30px;
    color: #555;
    cursor: pointer;
    width: 6rem;
}

.empty-message {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    border: 1px solid #555;
    border-radius: 20px;
    margin: 3rem;
}
</style>