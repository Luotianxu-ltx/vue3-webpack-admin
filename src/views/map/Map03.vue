<template>
  <MapBase class="mapBase" @mapInit = 'mapInit'></MapBase>
</template>

<script lang='js'>
import { defineComponent } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map03',
    components: {
        MapBase
    },
    setup () {
        function mapInit (baseMap, baseMapLayer) {
            const map = baseMap
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
