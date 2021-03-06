import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const routes = [
    {
        path: '/',
        name: 'home',
        component: MovieLister,
        meta : {
            requiresAuth: false
        }
    },
    //movies path??
    //actors path??
    //validation path??
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router;