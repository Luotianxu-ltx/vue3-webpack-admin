import router from '@/router/index'
import { computed } from 'vue'
import { myStore, Key } from '@/store'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const store = myStore(Key)

router.beforeEach((to, from, next) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const list = computed(() => store.state.system?.SYSTEM_PAGE_LIST)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tagsList = computed(() => store.state.system?.SYSTEM_ROUTER)

    // 判断路由是否存在
    const isExist = router.getRoutes().some((item) => {
        return item.path === to.fullPath
    })

    if (to.path === '/login') {
        return next()
    }

    if (isExist) {
        const flag = tagsList.value.some((item:any) => {
            return item.path as string === to.fullPath
        })
        if (!flag) {
            store.commit('system/SET_SYSTEM_ROUTER', {
                name: to.name,
                path: to.fullPath
            })
        }
        return next()
    }
    return next('/login')
})
