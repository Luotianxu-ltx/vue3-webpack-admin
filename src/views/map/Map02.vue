<template>
    <MapBase @mapInitBase="mapInit"></MapBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import L from '@/lib/leaflet'
import MapBase from '@/components/mapBase/MapBase.vue'

export default defineComponent({
    name: 'Map02',
    components: {
        MapBase
    },
    setup() {
        let map: L.Map
        const mapInit = (baseMap: L.Map) => {
            map = baseMap
            const scale = L.control.scale()
            map.addControl(scale)

            // map.setView([39.909186, 116.397411], 10)
            map.locate({
                setView: true,
                maxZoom: 18
            })
            // 定位成功
            map.on('locationfound', function (e) {
                console.log(e)
                L.marker(e.latlng)
                    .addTo(map)
                    .bindPopup('你的位置')
                    .openPopup()
                L.circle(e.latlng, e.accuracy / 2).addTo(map)
            })

            // 注册定位失败事件
            map.on('locationerror', function (e) {
                console.log('定位出错=====>', e)
            })
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
