<template>
    <MapBase class="mapBase" @mapInitBase="mapInit"></MapBase>
</template>

<script lang="js">
import { defineComponent, onMounted } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map05',
    components: {
        MapBase
    },
    setup () {
        let map
        onMounted(() => {
            // 添加绘制图层
            const drawnItems = new L.FeatureGroup()
            map.addLayer(drawnItems)
            // 添加绘制控件
            const drawControl = new L.Control.Draw({
                draw: {
                    // 绘制线
                    polyline: true,
                    // 绘制多边形
                    polygon: true,
                    // 绘制矩形
                    rectangle: true,
                    // 绘制圆
                    circle: true,
                    // 绘制标注
                    marker: true,
                    // 绘制圆形标注
                    circlemarker: true
                },
                edit: {
                    // 绘制图层
                    featureGroup: drawnItems,
                    // 图形编辑控件
                    edit: true,
                    // 图形删除控件
                    remove: true
                }
            })
            // 添加绘制控件
            map.addControl(drawControl)
            // 绘制事件
            map.on(L.Draw.Event.CREATED, function (e) {
                // 获取标注的类型
                var type = e.layerType
                // 获取绘制图层
                var drawlayer = e.layer
                if (type === 'marker') {
                    // 显示Popup
                    drawlayer.bindPopup('A popup!')
                }
                // 绘制图形添加显示
                drawnItems.addLayer(drawlayer)
            })
        })

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
