<template>
    <div class="history">
        <el-scrollbar>
            <div class="scrollbar-flex-content">
                <el-tag
                    class="tag"
                    v-for="(tag, index) in tagsList"
                    :key="tag.path"
                    closable
                    size="default"
                    :checked="isActive(tag.path)"
                    :type="isActive(tag.path) ? '' : 'info'"
                    :effect="isActive(tag.path) ? 'dark' : 'plain'"
                    @click="goto(tag.path)"
                    @close="closeTags(index)"
                >
                    {{ tag.name }}
                </el-tag>
            </div>
        </el-scrollbar>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags" size="default">
                <el-button size='default' type="primary">
                    标签选项
                    <Icon icon="xiangxia" color='#fff' :font='14' :padding='4'></Icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu >
                        <el-dropdown-item command="other">
                            关闭其他
                        </el-dropdown-item>
                        <el-dropdown-item command="all">
                            关闭所有
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Key } from '@/store'
import Icon from '@/components/icon/Icon.vue'
export default defineComponent({
    name: 'Tags',
    components: {
        Icon
    },
    setup() {
        interface RouterItem {
            name: string,
            path: string
        }

        const route = useRoute()
        const router = useRouter()
        const store = useStore(Key)

        // 判断是否是当前页面
        const isActive = (path: string) => {
            return path === route.fullPath
        }

        const tagsList: any = computed(() => store.state.system?.SYSTEM_ROUTER)

        // 设置标签
        const setTags = (to: any) => {
            const isExist = tagsList.value.some((item: RouterItem) => {
                return item.path as string === to.fullPath
            })
            if (!isExist) {
                store.commit('system/SET_SYSTEM_ROUTER', {
                    name: to.name,
                    path: to.fullPath
                })
            }
        }
        setTags(route)
        onBeforeRouteUpdate((to) => {
            setTags(to)
        })

        // 路由跳转
        const goto = (to: string) => {
            router.push(to)
        }

        const handleTags = (command: string) => {
            command === 'other' ? closeOther() : closeAll()
        }

        // 关闭单个标签
        const closeTags = (index: number) => {
            const delItem: RouterItem = tagsList.value[index]
            store.commit('system/DEL_SYSTEM_ROUTER', index)
            const item: RouterItem = tagsList.value[index] ?
                tagsList.value[index] :
                tagsList.value[index - 1]
            if (item) {
                delItem.path === route.fullPath && router.push(item.path)
            } else {
                router.push('/system/user')
            }
        }

        // 关闭全部标签
        const closeAll = () => {
            store.commit('system/ClEAR_SYSTEM_ROUTER')
            router.push('/system/user')
        }

        // 关闭其他标签(tagsList.value as Array<any>)
        const closeOther = () => {
            const curItem = (tagsList.value as Array<RouterItem>).filter((item: RouterItem) => {
                return item.path === route.fullPath
            })
            store.commit('system/CLOSEOTHER_SYSTEM_ROUTER', curItem)
        }
        return {
            tagsList,
            isActive,
            goto,
            closeTags,
            handleTags
        }
    }
})
</script>

<style scoped lang="scss">
    .history {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        background-color: #fff;
        padding: 0 5px;
    }

    .scrollbar-flex-content {
        height: 40px;
        display: flex;
        align-items: center;
    }

    .tag {
        margin: 0 2px;
        flex-shrink: 0;
    }

    .tags-close-box {
        margin-left: 5px;
    }
</style>
