import Vue from "vue";
import VueRouter from "vue-router";
import {
    auth
} from './firebase';

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: 'home',
        component: () => import("./components/marketing/LandingPage.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/todo",
        name: 'todo',
        component: () => import("./App.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/todoDetail/:id',
        name: 'todoDetail',
        component: () => import("./components/marketing/TestTodoVariable"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/about",
        name: 'about',
        component: () => import("./components/marketing/About"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: 'login',
        component: () => import("./components/auth/Login"),
    },
    {
        path: "/register",
        name: 'register',
        component: () => import("./components/auth/Register"),
    },

];

const router = new VueRouter({
    routes,
    base: process.env.BASE_URL,
    mode: 'history'
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})
export default router;