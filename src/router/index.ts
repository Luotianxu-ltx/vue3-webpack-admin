import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { myStore, Key } from '@/store'
import systemRouter from '@/router/modules/system'
import demoRouter from '@/router/modules/demo'
import mapRouter from '@/router/modules/map'
import NProgress from 'nprogress'
import 'nprogress/css/nprogress.css'
NProgress.configure({ showSpinner: false })

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const store = myStore(Key)

// router 类型扩展  as AddRouterRecordRaw[]
export type AddRouterRecordRaw = RouteRecordRaw & {
    hidden?: boolean
}

export const asyncRouterList: Array<RouteRecordRaw> = [...systemRouter,...demoRouter,...mapRouter]

const baseRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    }
]

const routes = [...baseRouter, ...asyncRouterList]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    store.commit('system/SET_SYSTEM_ACTIVE_ROUTER', to.path)
    // await store.dispatch('system/addRouter', to.path)
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
