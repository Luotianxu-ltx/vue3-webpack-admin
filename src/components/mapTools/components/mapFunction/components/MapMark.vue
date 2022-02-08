<template>
    <div>
        <el-button
            class="btnItem"
            type="primary"
            @click="showMapLocation"
            v-show="!isShowMapControl"
        >
            标注点
        </el-button>
        <div v-show="mapControlSign.includes('mapMark') && isShowMapControl">
            1
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name: 'MapMark',
    props: {
        mapControl: { // 父组件 v-model 没有指定参数名，则默认是 modelValue
            default: []
        },
        showControl: {
            default: false
        }
    },
    setup(props, { emit }) {
        // 初始化
        let baseMap = ''

        function initMapMark(map) {
            baseMap = map
            console.log(baseMap)
        }

        // 是否展示具体功能
        const isShowMapControl = ref(props.showControl)
        watch(() => props.showControl, () => { isShowMapControl.value = props.showControl })
        // 控制选择哪个具体功能
        const mapControlSign = ref(props.mapControl)
        watch(() => props.mapControl, () => { mapControlSign.value = props.mapControl })

        function showMapLocation() {
            emit('update:showControl', true)
            emit('update:mapControl', ['mapMark'])
        }

        return {
            initMapMark,
            showMapLocation,
            isShowMapControl,
            mapControlSign
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
