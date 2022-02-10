<template>
    <div class="item">
        <div class="title">显示设置</div>
        <div class="select">
            <div class="selectItem">
                缩放
                <el-switch
                    v-model="isShowZoomTool"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showZoomTool"
                />
            </div>
            <div class="selectItem">
                比例尺
                <el-switch
                    v-model="isShowScale"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showScale"
                />
            </div>
            <div class="selectItem">
                版权
                <el-switch
                    v-model="isShowCopyright"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showCopyRight"
                />
            </div>
            <div class="selectItem">
                路况
                <el-switch
                    v-model="isShowRoad"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showRoad"
                />
            </div>
            <div class="selectItem">
                鹰眼图
                <el-switch
                    v-model="isShowEagleEye"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showEagleEye"
                />
            </div>
            <div class="selectItem">
                鼠标经纬度
                <el-switch
                    v-model="isShowMouse"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showMouse"
                />
            </div>
            <div class="selectItem">
                打印
                <el-switch
                    v-model="isShowPrint"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showPrint"
                />
            </div>
            <div class="selectItem">
                网格
                <el-switch
                    v-model="isShowGrid"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="showGrid"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import L from '@/lib/leaflet'

export default defineComponent({
    name: 'MapShowSetting',
    setup() {
        let baseMap = ''
        function initMapSetting(map) {
            baseMap = map
        }

        // 缩放
        const zoomControl = L.control.zoom()
        const isShowZoomTool = ref(false)

        function showZoomTool() {
            if (isShowZoomTool.value) {
                baseMap.addControl(zoomControl)
            } else {
                zoomControl.remove()
            }
        }

        // 比例尺
        const scaleControl = L.control.scale({
            imperial: false
        })
        const isShowScale = ref(false)

        function showScale() {
            if (isShowScale.value) {
                baseMap.addControl(scaleControl)
            } else {
                scaleControl.remove()
            }
        }

        // 版权
        const copyRightControl = L.control.attribution()
        const isShowCopyright = ref(false)

        function showCopyRight() {
            if (isShowCopyright.value) {
                baseMap.addControl(copyRightControl)
                baseMap.attributionControl.setPrefix(
                    '<span>管理系统模板</span>'
                )
            } else {
                copyRightControl.remove()
            }
        }

        // 路况
        const isShowRoad = ref(false)
        const time = new Date().getTime()
        const traffic = L.tileLayer(
            'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=' +
                    time,
            {
                maxZoom: 18,
                minZoom: 1
            }
        )

        function showRoad() {
            if (isShowRoad.value) {
                traffic.addTo(baseMap)
                traffic.setZIndex(9)
            } else {
                baseMap.removeLayer(traffic)
            }
        }

        // 鹰眼图
        const isShowEagleEye = ref(false)
        const minMapLayer = L.tileLayer.chinaProvider('GaoDe.Normal.Map')
        const miniMap = new L.Control.MiniMap(minMapLayer, {
            position: 'bottomleft'
        })

        function showEagleEye() {
            if (isShowEagleEye.value) {
                baseMap.addControl(miniMap)
            } else {
                miniMap.remove()
            }
        }

        // 网格
        const isShowGrid = ref(false)
        const grid = L.graticule()

        function showGrid() {
            if (isShowGrid.value) {
                baseMap.addControl(grid)
            } else {
                grid.remove()
            }
        }

        // 鼠标经纬度
        const isShowMouse = ref(false)
        const mousePosition = L.control.mousePosition()

        function showMouse() {
            if (isShowMouse.value) {
                baseMap.addControl(mousePosition)
            } else {
                mousePosition.remove()
            }
        }

        // 打印
        const isShowPrint = ref(false)
        const browserPrint = L.control.browserPrint({
            title: '打印地图',
            printModes: ['Portrait', 'Landscape', 'Auto', 'Custom']
        })

        function showPrint() {
            if (isShowPrint.value) {
                baseMap.addControl(browserPrint)
            } else {
                browserPrint.remove()
            }
        }

        return {
            initMapSetting,
            isShowZoomTool,
            isShowScale,
            isShowCopyright,
            isShowRoad,
            isShowEagleEye,
            isShowGrid,
            isShowMouse,
            isShowPrint,
            showZoomTool,
            showScale,
            showCopyRight,
            showRoad,
            showEagleEye,
            showGrid,
            showMouse,
            showPrint
        }
    }
})
</script>

<style scoped lang="scss">
    .item {
        margin-top: 10px;

        .title {
            margin-top: 10px;
            padding: 0 15px;
        }

        .select {
            margin: 10px;

            .selectItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 5px;
            }
        }
    }
</style>
