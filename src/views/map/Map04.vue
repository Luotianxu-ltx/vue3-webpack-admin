<template>
    <MapBase class="mapBase" @mapInitBase="mapInit"></MapBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map03',
    components: {
        MapBase
    },
    setup() {
        let map: L.Map
        function drow() {
            // 圆
            L.circle([30.52181, 114.39518], {
                // 半径
                radius: 15,
                // 颜色
                color: 'red',
                // 透明度
                fillOpacity: 1
            }).addTo(map)
            L.circle([30.52094, 114.39445], {
                // 圆半径
                radius: 15,
                // 颜色
                color: '#ffcc33',
                // 填充色
                fillColor: 'white',
                // 填充色透明度
                fillOpacity: 0.8
            }).addTo(map)
            // 线
            L.polyline(
                [
                    [30.52247, 114.39332],
                    [30.5209, 114.39332]
                ],
                {
                    // 线颜色
                    color: 'blue'
                }
            ).addTo(map)
            // 绘制矩形
            L.rectangle(
                [
                    [30.52172, 114.39359],
                    [30.52153, 114.39428]
                ],
                {
                    // 颜色
                    color: '#ff7800',
                    // 线宽
                    weight: 1,
                    // 填充色透明度
                    fillOpacity: 0.5
                }
            ).addTo(map)
            // 绘制多边形
            L.polygon(
                [
                    [30.52263, 114.39445],
                    [30.52215, 114.39406],
                    [30.52215, 114.39477]
                ],
                {
                    // 颜色
                    color: 'red'
                }
            ).addTo(map)
        }

        function mapInit(baseMap: L.Map) {
            map = baseMap
            map.setView([30.5217, 114.3948], 18)
            drow()
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
