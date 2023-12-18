<template>
  <main>
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Knowledge</h1>
    </header>

    <div class="new-course-form">
      <course-form></course-form>
    </div>

    <nav class="filter">
      <button
        class="filter-button"
        @click="filter = 'all'"
      >
        All courses
      </button>
      <button
        class="filter-button"
        @click="filter = 'favs'"
      >
        Fav courses
      </button>
    </nav>

    <div
      v-if="filter === 'all'"
      class="courses-list"
    >
      <p>You have {{ knowledgeStore.totalCount }} courses left to finish</p>
      <course-details
        v-for="course in knowledgeStore.courses"
        :key="course.id"
        :course="course"
      ></course-details>
    </div>
    <div
      v-if="filter === 'favs'"
      class="courses-list"
    >
      <p>You have {{ knowledgeStore.favCount }} courses left to finish</p>
      <course-details
        v-for="course in knowledgeStore.favs"
        :key="course.id"
        :course="course"
      ></course-details>
    </div>
  </main>
</template>

<script>
import { useKnowledgeStore } from './stores/KnowledgeStore'
import CourseDetails from './components/CourseDetails.vue';
import { ref } from 'vue';
import CourseForm from './components/CourseForm.vue';

  export default {
    components: {
        CourseDetails,
        CourseForm
    },
    setup() {
      const knowledgeStore = useKnowledgeStore();
      const filter = ref('all');

      return {
        knowledgeStore,
        filter
      };
    }
  }
</script>

<style scoped>
.courses-list {
  max-width: 640px;
  margin: 20px auto;
}


.filter {
  width: 640px;
  margin: 10px auto;
  text-align: right;
}

.filter-button {
  display: inline-block;
  margin-left: 10px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.8;
  font-size: 1em;
}
</style>