<template>
  <div class="mapBase" id="mapBase"></div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import L from '@/lib/leaflet'

export default defineComponent({
    name: 'MapBase',
    setup (props, context) {
        let baseMap: L.Map
        let baseMapLayer: L.Layer

        onMounted(() => {
            initMap()
        })

        function initMap () {
            baseMap = L.map('mapBase', {
                minZoom: 3,
                maxZoom: 18,
                zoomControl: false, // 默认不显示缩放控件
                attributionControl: false // 默认不显示版权
            })
            baseMapLayer = L.tileLayer.chinaProvider('GaoDe.Normal.Map').addTo(baseMap)
            baseMap.setView([39.909186, 116.397411], 10)
            exportMapAll()
            exportMapBase()
        }

        function exportMapAll () {
            context.emit('mapInit', baseMap, baseMapLayer)
        }

        function exportMapBase () {
            context.emit('mapInitBase', baseMap)
        }
        return {
            initMap,
            exportMapAll
        }
    }
})
</script>

<style scoped lang="scss">
.mapBase {
  width: 100%;
  height: 100%;
}
</style>
