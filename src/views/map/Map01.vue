<template>
    <MapBase @mapInitBase='mapInit'></MapBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map01',
    components: {
        MapBase
    },
    setup () {
        let map: L.Map
        const mapInit = (baseMap: L.Map) => {
            map = baseMap
            // 创建天地图影像图层
            const imgLayer = L.tileLayer.chinaProvider('GaoDe.Satellite.Map')
            // 添加放大镜
            L.magnifyingGlass({
                // 设置放大镜中显示的图层
                layers: [imgLayer],
                // 探查半径
                radius: 100,
                // 设置放大镜中图层级数和主图层的级数差（0表示同级）
                zoomOffset: 0
            }).addTo(map)
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
