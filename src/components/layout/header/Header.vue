<template>
    <div class="header">
        <div class="left">
            <div class='top item'>
                <el-avatar :size='40' :src='circleUrl'></el-avatar>
                <span class='title'>管理系统模板</span>
            </div>
            <i
                class="iconfont"
                :class="isCollapse ? 'mulushousuo' : 'muluzhankai'"
                @click="changAside"
            ></i>
            <BreadCrumb class="item"></BreadCrumb>
        </div>
        <div class="right">
            <Info class="item"></Info>
            <ScreenFull class="item"></ScreenFull>
            <ChangeLanguage class="item"></ChangeLanguage>
            <Setting class="item"></Setting>
            <Avatar class="item"></Avatar>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import Avatar from '@/components/layout/header/components/Avatar.vue'
import ChangeLanguage from '@/components/changeLanguage/ChangeLanguage.vue'
import ScreenFull from '@/components/layout/header/components/Screenfull.vue'
import Info from '@/components/layout/header/components/Info.vue'
import BreadCrumb from '@/components/layout/header/components/BreadCrumb.vue'
import Setting from '@/components/layout/header/components/Setting.vue'
import { useStore } from 'vuex'
import { Key } from '@/store'

export default defineComponent({
    name: 'Header',
    components: {
        ChangeLanguage,
        ScreenFull,
        Avatar,
        Info,
        BreadCrumb,
        Setting
    },
    setup() {
        const store = useStore(Key)
        const isCollapse = computed(
            () => store.state.system?.SYSTEM_COLLAPSE
        )

        function changAside() {
            store.commit('system/SET_SYSTEM_COLLAPSE', !isCollapse.value)
        }

        // 图标
        const state = reactive({
            circleUrl:
                'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            list: null
        })

        return {
            changAside,
            isCollapse,
            ...toRefs(state)
        }
    }
})
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #e4e4e4;

        .left {
            display: flex;
            align-items: center;

            .top {
                display: flex;
                align-items: center;

                .title {
                    font-weight: 600;
                    margin-left: 10px;
                    letter-spacing: 3px;
                }
            }

            .item {
                padding: 0 10px;
            }
        }

        .right {
            display: flex;
            align-items: center;

            .item {
                padding: 0 10px;
                cursor: pointer;
            }
        }
    }
</style>
