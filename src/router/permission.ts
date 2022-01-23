import router from '@/router/index'
import { computed } from 'vue'
import { myStore, Key } from '@/store'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const store = myStore(Key)

router.beforeEach((to, from, next) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const list = computed(() => store.state.user?.USER_INFO)

    if (to.path === '/login') {
        return next()
    }
    if (list.value) {
        return next()
    }
    return next('/login')
})
