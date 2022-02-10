<template>
    <el-container style='height: 100%'>
        <el-header><Header></Header></el-header>
        <el-container style='overflow: hidden'>
            <Aside></Aside>
            <el-main>
                <Content></Content>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import Header from '@/components/layout/header/Header.vue'
import Aside from './aside/Aside.vue'
import Content from './content/Content.vue'
import { defineComponent, computed } from 'vue'
import { Key } from '@/store'

export default defineComponent({
    name: 'Layout',
    components: {
        Aside,
        Header,
        Content
    },
    setup() {
        const store = useStore(Key)
        const isCollapse = computed(
            () => store.state.system?.SYSTEM_COLLAPSE
        )
        return {
            isCollapse
        }
    }
})
</script>

<style scoped lang="scss"></style>
