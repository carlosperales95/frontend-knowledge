import { defineStore } from 'pinia';

export const useKnowledgeStore = defineStore('knowledgeStore', {
    state: () => ({
        name: 'Carlos',
        courses: [],
        isLoading: false,
        selectedCourse: {},
        searchString: "",
    }),
    getters: {
        sorted: (state) => {
            return state.courses
                .reduce((acc, course) => !course.completed ? [course, ...acc] : [...acc, course], []);
        },
        sortedFavs: (state) => {
            return state.courses
                .filter(course => course.isFav)
                .reduce((acc, course) => !course.completed ? [course, ...acc] : [...acc, course], []);
        },
        completes: (state) => {
            return state.courses
                .filter(course => course.completed)
        },
        searched: (state) => {
            if (state.searchString === "" || !state.searchString)
                return state.courses
                    .reduce((acc, course) => !course.completed ? [course, ...acc] : [...acc, course], []);

            return state.courses
                .filter(course => course.title
                    .toLowerCase()
                    .includes(state.searchString))
                .reduce((acc, course) => !course.completed ? [course, ...acc] : [...acc, course], []);
        },
        totalCount: (state) => {
            return state.courses
                .filter(course => !course.completed).length;
        },
        favCount: (state) => {
            return state.courses
                .filter(course => !course.completed)
                .reduce((count, currentCourse) => currentCourse.isFav ? count + 1 : count, 0)
        },
        completesCount: (state) => {
            return state.courses
                .filter(course => !course.completed)
                .reduce((count, currentCourse) => currentCourse.completed ? count + 1 : count, 0);
        },
        searchCount: (state) => {
            return state.courses
                .filter(course => !course.completed)
                .reduce((count, currentCourse) => currentCourse.title
                    .toLowerCase()
                    .includes(state.searchString) ? count + 1 : count, 0);
        },
        
    },
    actions: {
        async getCourses() {
            this.courses = [];
            this.isLoading = true;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses.json`);
            const data = await res.json();
            
            if (data) {
                Object.entries(data).forEach(c => {
                    const course = {
                        id: c[0],
                        ...c[1]
                    };
                    this.courses.push(course);
                });
            }
            this.isLoading = false;
        },
        async addCourse(course) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses.json`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(course)
            });
            
            if(res.error) console.log(res.error);
            this.courses.push(course);
        },
        async deleteCourse(id) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}.json`, {
                method: 'DELETE'
            });
            
            if(res.error) console.log(res.error);
            this.courses = this.courses.filter(c => c.id !== id);
        },
        async toggleFav(id) {
            const course = this.courses.find(c => c.id === id);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}.json`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({isFav: !course.isFav})
            });
            
            if(res.error) console.log(res.error);
            course.isFav = !course.isFav;
        },
        async toggleComplete(id) {
            const course = this.courses.find(c => c.id === id);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}.json`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({completed: course.completed})
            });
            
            // if there is an error in req we revert the course to prev value (local)
            if(res.error) {
                console.log(res.error);
                course.completed = !course.completed
            }
            // course.completed is already modeled by the checkbox
        },
        async getCourse(id) {
            this.isLoading = true;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}.json`);
            
            if(res.error) console.log(res.error);
            const data = await res.json();
            this.selectedCourse = data;
            this.isLoading = false
        },
        async editCourse(id, course) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}.json`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: course.title,
                    source: course.source,
                    duration: course.duration
                })
            });
            
            if(res.error) console.log(res.error);
            const data = await res.json();
            this.selectedCourse = data;
        },
    }
});

