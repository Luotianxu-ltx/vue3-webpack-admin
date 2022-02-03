<template>
    <div :class="{'main': isShowMapControl}">
        <el-button class='btnItem' type='primary' @click='showMapLocation' v-show='!isShowMapControl'>位置查询
        </el-button>
        <div v-show="mapControlSign.includes('mapLocation') && isShowMapControl">
            <el-tabs v-model='activeName' :stretch='true'>
                <el-tab-pane label='地名' name='first'>
                    <MapLocationName ref='mapLocationName' @move='move'></MapLocationName>
                </el-tab-pane>
                <el-tab-pane label='经纬度' name='second'>
                    <MapLocationLat ref='mapLocationLat' @move='move'></MapLocationLat>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import L from '@/lib/leaflet'
import { useStore } from 'vuex'
import MapLocationName from '@/components/mapTools/components/mapLocation/components/MapLocationName.vue'
import MapLocationLat from '@/components/mapTools/components/mapLocation/components/MapLocationLat.vue'
import { Key } from '@/store'

export default defineComponent({
    name: 'MapLocation',
    components: {
        MapLocationName,
        MapLocationLat
    },
    setup() {
        // 初始化
        let baseMap = ''
        let poiGroupLayer = ''

        function initMapLocation(map) {
            baseMap = map
            poiGroupLayer = new L.FeatureGroup().addTo(baseMap)
        }

        const activeName = ref('first')
        const mapLocationName = ref()
        const mapLocationLat = ref()

        // 展示具体功能
        const store = useStore(Key)
        // 是否显示具体功能
        const isShowMapControl = ref(false)
        // 控制选择哪个具体功能
        const mapControlSign = ref(['navigation', 'pathPlanning', 'mapMark', 'mapLocation'])

        function showMapLocation() {
            store.commit('system/SET_SYSTEM_MAP_CONTROL', true)
            store.commit('system/SET_SYSTEM_MAP_CONTROL_SIGN', ['mapLocation'])
        }

        // 生成图标并移动
        function move(data) {
            poiGroupLayer.clearLayers()
            data.forEach((item) => {
                const content = `<span>${item.name}</span><br><span>${item.address}</span><br><span>经度：${item.local[1]} 纬度：${item.local[0]}</span>`
                const marker = L.marker(item.local)
                marker.bindTooltip(content, {
                    direction: 'top',
                    offset: [-15, -10]
                }).openTooltip()
                poiGroupLayer.addLayer(marker)
            })
            baseMap.fitBounds(poiGroupLayer.getBounds())
        }

        // 返回主页时清空表单
        watch(isShowMapControl, (value) => {
            mapLocationName.value.clear()
            mapLocationLat.value.clear()
            if (value === false) {
                poiGroupLayer.clearLayers()
            }
        })

        return {
            activeName,
            initMapLocation,
            showMapLocation,
            isShowMapControl,
            mapControlSign,
            mapLocationName,
            mapLocationLat,
            move
        }
    }
})
</script>

<style scoped lang='scss'>
    .main {
        width: 100%;
    }

    .btnItem {
        width: 100px;
        height: 30px;
        margin: 2px;
        border-radius: 5px;
    }
</style>
