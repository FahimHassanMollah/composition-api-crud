import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue';
import NotFound from '../views/NotFound.vue';
import Add from '../views/Add.vue';
import View from '../views/View.vue';
import Edit from '../views/Edit.vue';
import Login from '../views/Login.vue';
import AppointmentList from '../views/appointments/AppointmentList.vue';
import store from '../store';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/appointments',
      name: 'appointmentList',
      component: AppointmentList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'list',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
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


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters['login/authToken']?.accessToken) {
      next();
    }
    else {
      next({ name: 'login' });
    }
    console.log(store.getters['login/authToken'], " store.getters['login/isLoggedIn']");
  }
  else {
    (store.getters['login/authToken']?.accessToken) ? (router.push({ name: 'home' })) : next();
  }
})

export default router
