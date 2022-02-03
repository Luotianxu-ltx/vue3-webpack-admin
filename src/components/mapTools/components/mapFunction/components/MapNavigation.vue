<template>
    <div>
        <el-button class='btnItem' type='primary' @click='showMapLocation' v-show='!isShowMapControl'>城市导航
        </el-button>
        <div v-show="mapControlSign.includes('navigation') && isShowMapControl">
            00000
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'

export default defineComponent({
    name: 'MapNavigation',
    setup() {
        // 初始化
        let baseMap = ''

        function initMapNavigation(map) {
            baseMap = map
            console.log(baseMap)
        }

        // 展示具体功能
        const store = useStore(Key)
        // 是否显示具体功能
        const isShowMapControl = ref(false)
        // 控制选择哪个具体功能
        const mapControlSign = ref(['navigation', 'pathPlanning', 'mapMark', 'mapLocation'])

        function showMapLocation() {
            store.commit('system/SET_SYSTEM_MAP_CONTROL', true)
            store.commit('system/SET_SYSTEM_MAP_CONTROL_SIGN', ['navigation'])
        }

        return {
            initMapNavigation,
            showMapLocation,
            isShowMapControl,
            mapControlSign
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
