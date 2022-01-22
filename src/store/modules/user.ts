const userSate = {
    // 用户信息
    USER_INFO: '',
    // 用户权限列表
    USER_PERMISSIONS: []
}

export type userSateType = typeof userSate

export default {
    namespaced: true,
    state: userSate,
    mutations: {
        SET_USER_INFO(state: userSateType, data: string): void {
            state.USER_INFO = data
        },
        SET_USER_PERMISSIONS(state: userSateType, data: []): void {
            state.USER_PERMISSIONS = data
        }
    },
    actions: {},
    modules: {}
}
