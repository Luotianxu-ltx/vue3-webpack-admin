<template>
    <div class="aside">
        <div class="top">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
            <span v-show="!isCollapse" class="title">管理系统模板</span>
        </div>
        <el-scrollbar height="100%">
            <el-menu
                :collapse="isCollapse"
                unique-opened
                :collapse-transition="false"
                class="el-menu-vertical-demo"
                :default-active="activeRouter"
            >
                <el-sub-menu
                    v-for="(item, index) in (list as any)"
                    :key="index"
                    :index="index.toString()"
                >
                    <template #title>
                        <Icon :icon="item.icon"></Icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item
                        v-for="(item1, index1) in item.children"
                        :key="index1"
                        :index="item1.url"
                        @click="navRouter(item1)"
                    >
                        <template #title>
                            <Icon :icon="item1.icon"></Icon>
                            <span>{{ item1.name }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import Icon from '@/components/icon/Icon.vue'
import { Key } from '@/store'
import { getUserPermissionsApi } from '@/api/system/userApi'
import { ElMessage } from 'element-plus'
import router from '@/router'

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
            circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            list: null
        })
        const user = computed(() => JSON.parse(store.state.user?.USER_INFO as string))

        // 获取菜单列表
        onMounted(() => {
            getList()
        })
        async function getList() {
            const res = await getUserPermissionsApi({ id: user.value.id })
            if (res.status === 200) {
                state.list = res.data.list as any
                store.commit('system/SET_SYSTEM_PAGE_LIST',JSON.stringify(res.data.list))
            } else {
                ElMessage.error('获取菜单失败,请重新登录!')
                await router.push('/login')
            }
        }

        // 当前页面
        const activeRouter = computed(() => store.state.system?.SYSTEM_ACTIVE_ROUTER)

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

<style scoped lang="scss">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .aside {
        height: 100%;
        background-color: #fff;
        position: relative;
        //box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%)!important;
        z-index: 3;
        overflow: hidden;

        .top {
            height: 50px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #e4e4e4;

            .title {
                font-weight: 600;
                margin-left: 10px;
                letter-spacing: 3px;
            }
        }
    }

    .el-menu {
        border-right: 0;
    }
</style>
