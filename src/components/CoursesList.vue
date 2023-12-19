<template>
    <div class="courses-list" >
        <div class="list-header">
            <p>You have {{ coursesCount }} courses left to finish</p>
            <router-link class="router-button" to="/courses/new">Add</router-link>
        </div>
        <course-details
            v-for="course in courses"
            :key="course.id"
            :course="course"
        ></course-details>
    </div>
</template>

<script>
import CourseDetails from './CourseDetails.vue';

export default {
    components: {
        CourseDetails
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
    background-color: #ffe659;
    transition: background-color 1s linear;
}

.list-header {
    display: flex;
    justify-content: space-between;
}

</style>