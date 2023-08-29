import { createRouter, createWebHistory } from 'vue-router'
import TasksView from '../views/TasksView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useStore } from '../stores/appStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: TasksView,

      beforeEnter: (to) => {
        const store = useStore()
        const authenticated = store.authenticated;
        if ( !authenticated && to.name !== 'login' ) {
          return { name: 'login' }
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
  ]
})

export default router
