<template>
  <MapBase class="mapBase" @mapInitBase = 'mapInit'></MapBase>
</template>

<script lang='js'>
import { defineComponent, onMounted } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map06',
    components: {
        MapBase
    },
    setup () {
        let markers = ''
        let map = ''
        // 聚合多边形
        let polygon = ''

        onMounted(() => {
            markers = L.markerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true })
            // 添加随机标注
            populate()

            // 鼠标移动到聚合标注上，将点绘制成多边形
            markers.on('clustermouseover', function (a) {
                if (polygon) {
                    // 移除绘制的多边形
                    map.removeLayer(polygon)
                }
                // 获取点集
                polygon = L.polygon(a.layer.getConvexHull())
                // 添加多边形
                map.addLayer(polygon)
            })

            // 鼠标移出取消绘制多边形
            markers.on('clustermouseout', function () {
                if (polygon) {
                    // 移除多边形
                    map.removeLayer(polygon)
                    polygon = null
                }
            })

            // Map放大缩小事件
            map.on('zoomend', function () {
                if (polygon) {
                    // 移除多边形
                    map.removeLayer(polygon)
                    polygon = null
                }
            })
        })

        // 添加标注
        function populate () {
            for (let i = 0; i < 100; i++) {
                // 生成随机标注
                const maker = L.marker(getRandomLatLng())
                // 添加标注
                markers.addLayer(maker)
            }
            map.addLayer(markers)
        }

        // 将聚合的标注连线
        function getRandomLatLng () {
            // 获取地图范围
            const bounds = map.getBounds()
            // 获取左下角坐标
            const southWest = bounds.getSouthWest()
            // 获取右下角坐标
            const northEast = bounds.getNorthEast()
            // 获取地图范围的长
            const lngSpan = northEast.lng - southWest.lng
            // 获取地图范围的宽
            const latSpan = northEast.lat - southWest.lat
            return L.latLng(
                // 返回任意地图范围内的x坐标
                southWest.lat + latSpan * Math.random(),
                // 返回任意地图范围内的y坐标
                southWest.lng + lngSpan * Math.random())
        }

        function mapInit (baseMap) {
            map = baseMap
        }
        return {
            mapInit
        }
    }
})
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}
</style>
