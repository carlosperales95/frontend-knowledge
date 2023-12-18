import { defineStore } from 'pinia';


export const useKnowledgeStore = defineStore('knowledgeStore', {
    state: () => ({
        courses: [
            {id: 1, title: 'Vanilla JS Curse', source: 'udemy', isFav: false, duration: '40'},
            {id: 2, title: 'VueJS Curse', source: 'udemy', isFav: true, duration: '40'},
        ],
        name: 'Carlos'
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
        addCourse(course) {
            this.courses.push(course);
        },
        deleteCourse(id) {
            this.courses = this.courses.filter(c => c.id !== id);
        },
        toggleFav(id) {
            const course = this.courses.find(c => c.id === id);
            course.isFav = !course.isFav;
        }
    }
});

