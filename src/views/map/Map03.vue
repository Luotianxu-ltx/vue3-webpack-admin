<template>
  <MapBase class="mapBase" @mapInit = 'mapInit'></MapBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map03',
    components: {
        MapBase
    },
    setup () {
        let map: L.Map
        function mapInit (baseMap: L.Map, baseMapLayer: L.Layer) {
            map = baseMap
            map.setView([30.5217, 114.3948], 18)
            const imgLayer = L.tileLayer.chinaProvider('GaoDe.Satellite.Map').addTo(map)

            L.control.sideBySide(baseMapLayer, imgLayer).addTo(map)
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
