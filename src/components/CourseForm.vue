<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            placeholder="I want to study..."
            v-model="newCourse"
        >
        <button>Add</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useKnowledgeStore } from '../stores/KnowledgeStore';

export default {
    setup() {
        const courseStore = useKnowledgeStore();

        const newCourse = ref('');

        const handleSubmit = () => {
            if(newCourse.value.length < 0) return;

            courseStore.addCourse({
                id: Math.floor(Math.random() * 10000),
                title: newCourse.value,
                source: 'youtube',
                isFav: false,
                duration: '40'
            });
            newCourse.value = '';
        };

        return {
            newCourse,
            handleSubmit
        };
    },
}
</script>

<style scoped>
.new-course-form {
    background: #e7e7e7;
    padding: 20px 0;
}

form {
    max-width: 400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;
}

form button {
    background: #ffd859;
    border: 0;
    padding: 10px;
    font-family: "Poppins";
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
}

form input {
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color: #555;
    font-size: 14px;
}
</style>