<template>
    <div class="courses-list" >
        <p>You have {{ coursesCount }} courses left to finish</p>
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

</style>