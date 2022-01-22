<template>
  <div class="map" id="map"></div>
</template>

<script lang='js'>
import { defineComponent, onMounted } from 'vue'
import L from '@/lib/leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

export default defineComponent({
    name: 'Map02',
    setup () {
        onMounted(() => {
            const map = L.map('map', {
                attributionControl: false,
                zoomControl: false
            })
            L.tileLayer('http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + process.env.VUE_APP_MAP_TIAN, { noWrap: true }).addTo(map)
            L.tileLayer('http://t4.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + process.env.VUE_APP_MAP_TIAN, { noWrap: true }).addTo(map)
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
                L.marker(e.latlng).addTo(map).bindPopup('你的位置').openPopup()
                L.circle(e.latlng, e.accuracy / 2).addTo(map)
            })

            // 注册定位失败事件
            map.on('locationerror', function (e) {
                console.log('定位出错=====>', e)
            })
        })
    }
})
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}
</style>
