import { createRouter, createWebHistory } from 'vue-router';
import AboutPage from './pages/AboutPage.vue';
import CourseDetailsPage from './pages/CourseDetailsPage.vue';
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
            path: '/courses/:id',
            component: CourseDetailsPage,
            props: true
        //     props: true,
        //     children: [
        //         {
        //             path: 'contact',
        //             component: ContactCoach
        //         }
        //     ]
        },
        {
            path: '/about',
            component: AboutPage
        }
        // {
        //     path: '/:notFound(.*)',
        //     component: NotFound
        // }
    ]
});

export default router;