<template>
    <div>
        <el-button class='btnItem' type='primary' v-show='!isOpen' @click='open()'>地图测量</el-button>
        <el-button class='btnItem' type='info' v-show='isOpen' @click='open()'>关闭测量</el-button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'MapArea',
    setup() {
        const isOpen = ref(false)

        function open() {
            isOpen.value = !isOpen.value
        }

        return {
            isOpen,
            open
        }
    }
})
</script>

<style scoped lang='scss'>
    .btnItem {
        width: 100px;
        height: 30px;
        margin: 2px;
        border-radius: 5px;
    }
</style>
