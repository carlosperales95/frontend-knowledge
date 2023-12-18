<template>
  <main>
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Knowledge</h1>
    </header>

    <div class="new-course-form">
      <course-form></course-form>
    </div>

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
    
  </main>
</template>

<script>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useKnowledgeStore } from './stores/KnowledgeStore'
import CourseForm from './components/CourseForm.vue';
import CourseList from './components/CoursesList.vue';
import CourseFilter from './components/CourseFilter.vue';

  export default {
    components: {
        CourseForm,
        CourseList,
        CourseFilter
    },
    setup() {
      const courseStore = useKnowledgeStore();
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
