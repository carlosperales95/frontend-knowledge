import { createRouter, createWebHistory } from 'vue-router';
import CourseForm from './pages/CourseForm.vue';
import ListPage from './pages/ListPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/courses'
        },
        {
            path: '/courses',
            component: ListPage
        },
        {
            path:'/courses/new',
            component: CourseForm
        },
        {
            path: '/coaches/:id',
            component: CourseForm,
        //     props: true,
        //     children: [
        //         {
        //             path: 'contact',
        //             component: ContactCoach
        //         }
        //     ]
        },
        // {
        //     path: '/:notFound(.*)',
        //     component: NotFound
        // }
    ]
});

export default router;