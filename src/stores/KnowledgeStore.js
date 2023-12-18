import { defineStore } from 'pinia';


export const useKnowledgeStore = defineStore('knowledgeStore', {
    state: () => ({
        name: 'Carlos',
        courses: [],
        isLoading: false
    }),
    getters: {
        favs: (state) => {
            return state.courses.filter(course => course.isFav);
        },
        favCount: (state) => {
            return state.courses
                    .reduce((count, currentCourse) => currentCourse.isFav ? count + 1 : count, 0);
        },
        totalCount: (state) => {
            return state.courses.length;
        }
    },
    actions: {
        async getCourses() {
            this.isLoading = true;
            const res = await fetch('http://localhost:3000/courses');
            const data = await res.json();
            this.courses = data;
            this.isLoading = false;
        },
        async addCourse(course) {
            const res = await fetch('http://localhost:3000/courses', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(course)
            });
            
            if(res.error) console.log(res.error);
            this.courses.push(course);
        },
        async deleteCourse(id) {
            const res = await fetch(`http://localhost:3000/courses/${id}`, {
                method: 'DELETE'
            });
            
            if(res.error) console.log(res.error);
            this.courses = this.courses.filter(c => c.id !== id);
        },
        async toggleFav(id) {
            const course = this.courses.find(c => c.id === id);
            const res = await fetch(`http://localhost:3000/courses/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({isFav: !course.isFav})
            });
            
            if(res.error) console.log(res.error);
            course.isFav = !course.isFav;
        }
    }
});

