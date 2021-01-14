import { createRouter, createWebHistory, RouteRecordRaw, NavigationHookAfter } from 'vue-router';
import NProgress from '@/plugins/nprogress';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/template',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((NProgress.done as unknown) as NavigationHookAfter);
export default router;
