<template>
    <div class='aside'>
        <el-scrollbar height='100%' style='border-right: 1px solid #e4e4e4;'>
            <el-menu
                :collapse='isCollapse'
                unique-opened
                :collapse-transition='true'
                class='el-menu-vertical-demo'
                :default-active='activeRouter'
            >
                <el-sub-menu
                    v-for='(item, index) in list'
                    :key='index'
                    :index='index.toString()'
                >
                    <template #title>
                        <Icon
                            style='margin-right: 5px'
                            :icon='item.icon'
                        ></Icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item
                        v-for='(item1, index1) in item.children'
                        :key='index1'
                        :index='item1.url'
                        @click='navRouter(item1)'
                    >
                        <template #title>
                            <Icon
                                :padding='5'
                                :icon='item1.icon'
                            ></Icon>
                            <span>{{ item1.name }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
import router from '@/router'
import { getUserPermissionsApi } from '@/api/system/userApi'
import { ElMessage } from 'element-plus'
import Icon from '@/components/icon/Icon.vue'

export default defineComponent({
    name: 'Aside',
    components: {
        Icon
    },
    setup() {
        const store = useStore(Key)
        // 是否收缩侧边栏
        const isCollapse = computed(
            () => store.state.system?.SYSTEM_COLLAPSE
        )
        // 图标
        const state = reactive({
            circleUrl:
                    'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            list: null
        })
        const user = computed(() =>
            JSON.parse(store.state.user?.USER_INFO as string)
        )

        // 获取菜单列表
        onMounted(() => {
            getList()
        })

        async function getList() {
            const res = await getUserPermissionsApi({ id: user.value.id })
            if (res.status === 200) {
                state.list = res.data.list as any
                store.commit(
                    'system/SET_SYSTEM_PAGE_LIST',
                    JSON.stringify(res.data.list)
                )
            } else {
                ElMessage.error('获取菜单失败,请重新登录!')
                await router.push('/login')
            }
        }

        // 当前页面
        const activeRouter = computed(
            () => store.state.system?.SYSTEM_ACTIVE_ROUTER
        )

        // 路由跳转
        function navRouter(item: any) {
            router.push(item.url)
        }

        return {
            isCollapse,
            ...toRefs(state),
            activeRouter,
            navRouter
        }
    }
})
</script>

<style scoped lang='scss'>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .aside {
        height: 100%;
        background-color: #fff;
        position: relative;
        z-index: 3;
    }

    .el-menu {
        border-right: 0;
    }
</style>
