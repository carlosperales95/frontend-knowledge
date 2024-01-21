<template>
    <div class="courses-list">
        <div class="list-header">
            <p>You have {{ coursesCount }} courses left to finish</p>
            <router-link class="router-button" to="/courses/new">
                Add Course
            </router-link>
        </div>
        <course-item
            v-for="course in courses"
            :key="course.id"
            :course="course"
        ></course-item>
    </div>
</template>

<script>
import CourseItem from './CourseItem.vue';

export default {
    components: {
        CourseItem
    },
    props: ['coursesCount', 'courses'],
}
</script>

<style scoped>
.courses-list {
    max-width: 640px;
    margin: 20px auto;
}

.router-button {
    background-color: #ffd859;
    padding: 1rem;
    text-decoration: none;
    border-radius: 30px;
    color: #555;
    cursor: pointer;
}

.router-button:hover {
    color: #000;
    background-color: #e6ff59;
    transition: background-color 1s linear;
}

.list-header {
    display: flex;
    justify-content: space-between;
}

</style>