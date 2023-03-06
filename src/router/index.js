import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue';
import NotFound from '../views/NotFound.vue';
import Add from '../views/Add.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
