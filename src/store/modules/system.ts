const systemState = {
    // 系统语言
    SYSTEM_LANGUAGE: 'zh',
    // 是否收缩侧边栏
    SYSTEM_COLLAPSE: false as boolean,
    // 所有菜单
    SYSTEM_PAGE_LIST: '',
    // 当前页面路由
    SYSTEM_ACTIVE_ROUTER: ''
}

export type SystemStateType = typeof systemState

export default {
    namespaced: true,
    state: systemState,
    mutations: {
        SET_SYSTEM_LANGUAGE(state: SystemStateType, data: string): void {
            state.SYSTEM_LANGUAGE = data
        },
        SET_SYSTEM_COLLAPSE (state: SystemStateType, data: boolean) {
            state.SYSTEM_COLLAPSE = data
        },
        SET_SYSTEM_PAGE_LIST(state: SystemStateType, data: string): void {
            state.SYSTEM_PAGE_LIST = data
        },
        SET_SYSTEM_ACTIVE_ROUTER(state: SystemStateType, data: string): void {
            state.SYSTEM_ACTIVE_ROUTER = data
        }
    },
    actions: {
    },
    modules: {}
}
