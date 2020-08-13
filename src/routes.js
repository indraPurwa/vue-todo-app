import LandingPage from "./components/marketing/LandingPage.vue";
import About from "./components/marketing/About";
import TestTodoVariable from "./components/marketing/TestTodoVariable";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import App from "./App.vue";

const routes = [{
        path: "/",
        name: 'home',
        component: LandingPage
    },
    {
        path: "/todo",
        name: 'todo',
        component: App
    },
    {
        path: "/about",
        name: 'about',
        component: About
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    },
    {
        path: "/register",
        name: 'register',
        component: Register
    },
    {
        path: '/todoDetail/:id',
        name: 'todoDetail',
        component: TestTodoVariable
    },
];

export default routes;