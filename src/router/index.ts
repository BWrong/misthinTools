import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw, NavigationHookAfter } from 'vue-router';
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
    name: 'template',
    component: () => import(/* webpackChunkName: "template" */ '../views/Template/index.vue')
  },
  {
    path: '/deploy',
    name: 'deploy',
    component: () => import(/* webpackChunkName: "deploy" */ '../views/Deploy/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
  }
];

const router = createRouter({
  history: process.env.IS_ELECTRON ?createWebHashHistory(process.env.BASE_URL):createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((NProgress.done as unknown) as NavigationHookAfter);
export default router;
