import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import system, { SystemStateType } from './modules/system'
import user, { userSateType } from './modules/user'
import createPersistedState from 'vuex-persistedstate'

export type State = {
    user?: userSateType,
    system?: SystemStateType
}

export const Key: InjectionKey<Store<State>> = Symbol('vuex')

const store = createStore({
    plugins: [
        createPersistedState({
            key: 'vue3-vite-admin'
        })
    ],
    modules: {
        system,
        user
    }
})

export default store
