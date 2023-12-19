<template>
    <course-filter
        :isLoading="isLoading"
        :filter="filter"
        :filters="filters"
        @change-filter="changeFilter"
    >
        <div>
            <div v-for="f in filters" :key="f.name">
                <div v-if="filter === f.name">
                    <course-list
                        :coursesCount="f.data.count"
                        :courses="f.data.courses"
                    ></course-list>
                </div>
            </div>
        </div>
    </course-filter>
</template>

<script>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useKnowledgeStore } from '../stores/KnowledgeStore';
import CourseList from '../components/CoursesList.vue';
import CourseFilter from '../components/CourseFilter.vue';


export default {
    components: {
        CourseList,
        CourseFilter
    },
    setup() {
        const courseStore = useKnowledgeStore();

        console.log(courseStore);
        const { courses, isLoading, favs, totalCount, favCount } = storeToRefs(courseStore);
        courseStore.getCourses();

        const filter = ref('all');
        const filters = reactive([
            {name: 'all', text: 'All Courses', data: {count: totalCount, courses: courses}},
            {name: 'favs', text: 'Fav Courses', data: {count: favCount, courses: favs}}
        ]);

        const changeFilter = (value) => {
            filter.value = value;
        };

        return {
            filter,
            filters,
            isLoading,
            changeFilter
        };
    }
}
</script>