<template>
    <nav class="filter">
        <div v-for="f in filters" :key="f.name">
            <button
                v-if="f.type === 'toggle'"
                class="filter-button"
                @click="$emit('change-filter', f.name)"
            > {{ f.text }} </button>
            <input
                type="text"
                v-if="f.type === 'search'"
                class="filter-button search"
                @input="handleSearchChange"
            />
        </div>
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
import { storeToRefs } from 'pinia';
import { useKnowledgeStore } from '../stores/KnowledgeStore';

export default {
    components: {
        CourseList
    },
    props: ['isLoading', 'filter', 'filters', 'courses', 'type'],
    emits: ['change-filter', 'search'],
    setup(_, context) {
        const courseStore = useKnowledgeStore();
        const { searchedString } = storeToRefs(courseStore);

        const handleSearchChange = (event) => {
            context.emit('search', event.target.value);
        }

        return {
            searchedString,
            handleSearchChange
        };
    }
}
</script>

<style scoped>
.filter {
    width: 640px;
    margin: 0.8rem auto;
    text-align: left;
}

.filter div {
    display: inline-block;
}

.filter-button {
    margin-right: 15px;
    background: #fff;
    border: 2px solid #555;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8;
    font-size: 1em;
}

input:focus {
    outline: none;
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