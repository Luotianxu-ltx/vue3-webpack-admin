<template>
    <div class="item">
        <div class="title">地图切换</div>
        <div class="btn">
            <el-radio v-model="mapType" label="GaoNormal" border>
                高德地图
            </el-radio>
            <el-radio v-model="mapType" label="GaoDeImage" border>
                高德卫星
            </el-radio>
            <el-radio v-model="mapType" label="TianNormal" border>
                天地图
            </el-radio>
            <el-radio v-model="mapType" label="TianImage" border>
                天地图卫星
            </el-radio>
            <el-radio v-model="mapType" label="TianTerrain" border>
                天地图地形
            </el-radio>
            <el-radio v-model="mapType" label="OSM" border>
                OSM地图
            </el-radio>
            <el-radio v-model="mapType" label="GeoNormal" border>
                智图
            </el-radio>
            <el-radio v-model="mapType" label="GeoNormal1" border>
                智图深色
            </el-radio>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import L from '@/lib/leaflet'

export default defineComponent({
    name: 'MapChange',
    setup() {
        const mapType = ref('')

        watch(mapType, () => {
            changeBaseMapLayer(mapType)
        })

        let baseMap = ''
        let baseMapLayer = ''

        function initMapChange(map, layer, type) {
            baseMap = map
            baseMapLayer = layer
            mapType.value = type
            changeBaseMapLayer(mapType)
        }

        // 切换地图
        function changeBaseMapLayer(type) {
            /**
                 * 高德地图
                 */
            const GaoNormal = L.tileLayer.chinaProvider('GaoDe.Normal.Map')

            const Gaodimgem = L.tileLayer.chinaProvider(
                'GaoDe.Satellite.Map'
            )
            const Gaodimga = L.tileLayer.chinaProvider(
                'GaoDe.Satellite.Annotion'
            )
            const GaoDeImage = L.layerGroup([Gaodimgem, Gaodimga])
            /**
                 * 天地图内容
                 */
            const normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map')
            const normala = L.tileLayer.chinaProvider(
                'TianDiTu.Normal.Annotion'
            )
            const imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map')
            const imga = L.tileLayer.chinaProvider(
                'TianDiTu.Satellite.Annotion'
            )
            const terrain = L.tileLayer.chinaProvider(
                'TianDiTu.Terrain.Map'
            )
            const terraina = L.tileLayer.chinaProvider(
                'TianDiTu.Terrain.Annotion'
            )

            const TianNormal = L.layerGroup([normalm, normala])
            const TianImage = L.layerGroup([imgm, imga])
            const TianTerrain = L.layerGroup([terrain, terraina])
            /**
                 * 智图地图内容
                 */
            const GeoNormal = L.tileLayer.chinaProvider('Geoq.Normal.Map')
            const GeoNormal1 = L.tileLayer.chinaProvider(
                'Geoq.Normal.PurplishBlue'
            )
            /**
                 * OSM
                 */
            const OSM = L.tileLayer.chinaProvider('OSM.Normal.Map')

            const mapLayer = {
                GaoNormal,
                GaoDeImage,
                TianNormal,
                TianImage,
                TianTerrain,
                OSM,
                GeoNormal,
                GeoNormal1
            }
            baseMap.removeLayer(baseMapLayer)
            baseMapLayer = mapLayer[type.value].addTo(baseMap)
        }

        return {
            mapType,
            initMapChange
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

        .btn {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 10px;
            border-radius: 5px;
        }

        .el-radio {
            width: 100px;
            height: 30px;
            margin: 2px !important;
        }
    }
</style>
