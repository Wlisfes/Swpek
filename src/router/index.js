import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { getStore } from '@/lib';


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach(async (to, from, next) => {
    if(to.name === "userplayList") {
        const token = await getStore('kieToken')
        if(token.kieToken) {
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