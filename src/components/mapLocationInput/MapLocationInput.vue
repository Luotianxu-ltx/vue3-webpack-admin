<template>
  <el-icon class="icon" @click="getLocation()"><location /></el-icon>
</template>

<script>
import { Location } from '@element-plus/icons'
import { defineComponent, reactive, watch } from 'vue'
import L from '@/lib/leaflet'
import { getMapByLatApi } from '@/api/map/mapGaodeApi'

export default defineComponent({
    name: 'MapLocationInput',
    components: {
        Location
    },
    setup (props, context) {
        let _map = ''
        let poiGroupLayer = ''
        function initMapLocationInput (map) {
            _map = map
            poiGroupLayer = new L.FeatureGroup().addTo(_map)
        }

        const latlng = reactive({
            name: '',
            latlng: {}
        })
        const getLocation = () => {
            _map.once('mouseup', async (e) => {
                latlng.latlng = e.latlng// {lat: 30.59, lng: 114.32}
            })
        }

        // 添加图标
        watch(() => latlng.latlng, async () => {
            latlng.name = await search(latlng.latlng.lng, latlng.latlng.lat)
            if (poiGroupLayer) {
                poiGroupLayer.clearLayers()
            }
            const marker = L.marker([latlng.latlng.lat, latlng.latlng.lng])
            const content = `<span>${latlng.name}</span><br><span>经度：${latlng.latlng.lng} 纬度：${latlng.latlng.lat}</span>`
            marker.bindTooltip(content, {
                direction: 'top',
                offset: [-15, -10]
            }).openTooltip()
            poiGroupLayer.addLayer(marker)
            context.emit('update', latlng)
        })

        // 搜索地名
        const search = async (lng, lat) => {
            const res = await getMapByLatApi({
                output: 'JSON',
                location: `${lng},${lat}`,
                key: `${process.env.VUE_APP_MAP_AMAP}`
            })
            return res.regeocode.formatted_address
        }

        // 设置数据
        function set (data) {
            latlng.latlng = data.latlng
            latlng.name = data.name
        }

        function clear () {
            if (poiGroupLayer) {
                poiGroupLayer.clearLayers()
            }
        }

        return {
            initMapLocationInput,
            getLocation,
            clear,
            set
        }
    }
})
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
}
</style>
