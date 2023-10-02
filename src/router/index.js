import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import CategoryPage from '../views/CategoryPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/category/:name',
      name: 'category',
      component: CategoryPage,
    },
    {
      path:  '/:pathMatch(.*)*',
      name:  'NotFound',
      component: NotFoundPage,
    }
  ],
});

export default router;
