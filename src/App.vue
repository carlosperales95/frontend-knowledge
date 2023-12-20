<template>
  <main>
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Knowledge</h1>
      <div class="router-bar">
        <router-link class="router-button" to="/courses">Courses</router-link>
        <router-link class="router-button" to="/about">About</router-link>
      </div>
    </header>
      <router-view></router-view>
  </main>
</template>

<script>
import {RouterLink, RouterView} from 'vue-router';
  export default {
    components: {
      RouterLink,
      RouterView
    },
  }
</script>
<style scoped>
.router-bar {
    margin: 0 auto;
    padding: 6rem;
    padding-bottom: 0;
    flex-basis: 100%;
    text-align: right;
}

.router-button {
    display: inline-block;
    padding: 1rem;
    padding-bottom: 0.2rem;
    margin-left: 10px;
    cursor: pointer;
    font-size: 1.2em;
    text-decoration: none;
    color: #555;
    justify-content: flex-end;
}

.router-button:hover {
  color: #000;
}

.router-link-active {
  border-bottom: 4px solid #000;
  font-weight: 600;

}
</style>
