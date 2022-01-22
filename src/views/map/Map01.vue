<template>
  <div class="map" id="map"></div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import L from '@/lib/leaflet'

export default defineComponent({
    name: 'Map01',
    setup () {
        onMounted(() => {
            const map = L.map('map', {
                // 显示中心
                center: [30.5217, 114.3948],
                // 最小显示等级
                minZoom: 0,
                // 最大显示等级
                maxZoom: 18,
                // 当前显示等级
                zoom: 18
            })
            // 加载天地图矢量图层
            L.tileLayer('http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + process.env.VUE_APP_MAP_TIAN, { noWrap: true }).addTo(map)
            // 加载天地图矢量注记图层
            L.tileLayer('http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + process.env.VUE_APP_MAP_TIAN, { noWrap: true }).addTo(map)
            // 创建天地图影像图层
            const imgLayer = L.tileLayer('http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + process.env.VUE_APP_MAP_TIAN, { noWrap: true })
            // 添加放大镜
            L.magnifyingGlass({
                // 设置放大镜中显示的图层
                layers: [imgLayer],
                // 探查半径
                radius: 100,
                // 设置放大镜中图层级数和主图层的级数差（0表示同级）
                zoomOffset: 0
            }).addTo(map)
            console.log(L)
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
