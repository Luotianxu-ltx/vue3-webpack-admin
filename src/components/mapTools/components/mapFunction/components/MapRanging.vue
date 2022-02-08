<template>
    <div>
        <el-button
            class="btnItem"
            type="primary"
            v-show="!isOpen"
            @click="open()"
        >
            地图测距
        </el-button>
        <el-button class="btnItem" type="info" v-show="isOpen">
            关闭测距
        </el-button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'MapRanging',
    setup() {
        // 初始化
        let baseMap = ''

        function initMapRanging(map) {
            baseMap = map
            console.log(baseMap)
        }

        const isOpen = ref(false)

        function open() {
            isOpen.value = !isOpen.value
        }

        return {
            isOpen,
            open,
            initMapRanging
        }
    }
})
</script>

<style scoped lang="scss">
    .btnItem {
        width: 100px;
        height: 30px;
        margin: 2px;
        border-radius: 5px;
    }
</style>
