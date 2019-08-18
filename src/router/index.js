import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if(to.name === "userplayList") {
        if (0) {
            next()
        }
    }
    else {
        //设置title
        if(to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }
})

router.afterEach(() => {

})

export default router;