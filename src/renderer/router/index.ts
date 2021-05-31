import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
// import NProgress from '~/plugins/nprogress';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/template'
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
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting/index.vue')
  },
  // {
  //   path: '/tools',
  //   name: 'tools',
  //   component: () => import(/* webpackChunkName: "tools" */ '../views/Tools/index.vue')
  // }

];
const isDevelopment = process.env.NODE_ENV !== 'production';
if (isDevelopment) {
  routes.push({
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo/index.vue')
  });
}
const router = createRouter({
  // electron必须使用hash模式
  history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
  routes
});
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();
// });
// router.afterEach((NProgress.done as unknown) as NavigationHookAfter);
export default router;
