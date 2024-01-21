<template>
    <course-filter
        :isLoading="isLoading"
        :filter="filter"
        :filters="filters"
        :courses="courses"
        @change-filter="changeFilter"
        @search="storeSearch"
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

        const {
            courses,
            isLoading,
            sorted,
            searched,
            searchCount,
            sortedFavs,
            completes,
            totalCount,
            favCount,
            completesCount,
            searchString
        } = storeToRefs(courseStore);
        
        courseStore.getCourses();

        const filter = ref('all');
        const filters = reactive([
            {
                name: 'all',
                text: 'All',
                type: 'toggle',
                data: {count: totalCount, courses: sorted}
            },
            {
                name: 'favs',
                text: 'Fav',
                type: 'toggle',
                data: {count: favCount, courses: sortedFavs}
            },
            {
                name: 'completed',
                text: 'Completed',
                type: 'toggle',
                data: {count: completesCount, courses: completes}
            },
            {
                name: 'search',
                text: 'search',
                type: 'search',
                data: {count: searchCount, courses: searched}
            }
        ]);

        const changeFilter = (value) => {
            filter.value = value;
        };

        const storeSearch = (value) => {
            filter.value = 'search';
            searchString.value = value;
        };

        return {
            filter,
            filters,
            courses,
            isLoading,
            changeFilter,
            storeSearch
        };
    }
}
</script>