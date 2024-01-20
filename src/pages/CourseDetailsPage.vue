<template>
    <div class="loading" v-if="isLoading">Loading course...</div>
    <div class="details-course form" v-else-if="mode === 'view'">
        <div class="details-header">
            <h1>{{ selectedCourse.title }}</h1>
            <button @click="changeMode">
                <i class="material-icons">mode</i>
            </button>
        </div>
        <div class="details-row">
            <h3>Source of the course</h3>
            <p>{{ selectedCourse.source }}</p>
        </div>
        <div class="details-row">
            <h3>Duration</h3>
            <p>{{ courseHMSDuration }}</p>
        </div>
    </div>
    <div v-else>
        <course-view
            :course="selectedCourse"
            :id="id"
            :mode="mode"
            @change-mode="changeMode"
        ></course-view>
    </div>
</template>

<script>
import { useKnowledgeStore } from '../stores/KnowledgeStore';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import CourseView from './CourseView.vue';

export default {
    components: { CourseView },
    props: ['id'],
    setup(props) {
        const courseStore = useKnowledgeStore();
        const { selectedCourse, isLoading } = storeToRefs(courseStore);
        courseStore.getCourse(props.id);

        const courseHMSDuration = computed(() => {
            const hours = Math.floor(selectedCourse.value.duration/60);
            return `${hours} h ${selectedCourse.value.duration - (hours * 60)} min`;
        });

        const mode = ref('view');

        const changeMode = () => {
            mode.value = mode.value === 'view' ? 'edit' : 'view';
        };

        return {
            selectedCourse,
            isLoading,
            mode,
            courseHMSDuration,
            changeMode
        };
    },
}
</script>

<style scoped>
.details-course {
    /* background: #e7e7e7; */
    padding: 20px 0;
    text-align: center;
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}


.details-row {
    display: inline-flex;
    flex-direction: column;
    /* width: 80%; */
    padding: 0.2rem 1rem 0.2rem 1rem;
    margin-bottom: 20px;
    text-align: left;
    align-content: flex-start;
    align-items: left;
    border: 1px #444 solid;
    border-radius: 15px;
    background-color: #fff;
}

.details-row h3 {
    border-bottom: 1px #444 solid;
}

.details-header {
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    align-items: left;
}

button {
    border: 1px solid #555;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    align-self: center;
}
</style>