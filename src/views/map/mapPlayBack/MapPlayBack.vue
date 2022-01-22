<template>
  <div class='mapBase'>
    <div class='map' id='map'></div>
    <PlayControl ref='playControl' :data='playBack.data' @showMarker='showMarker'></PlayControl>
    <PlayTable ref='playTable'></PlayTable>
  </div>
</template>

<script lang='js'>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import L from '@/lib/leaflet'
import { getPlayBackListApi } from '@/api/map/mapApi'
import PlayControl from './components/PlayControl.vue'
import PlayTable from './components/PlayTable.vue'
import dayjs from 'dayjs'
import { getMapBasicIconRequire } from '@/utils/map/mapIcon'

export default defineComponent({
    name: 'Map08',
    components: {
        PlayControl,
        PlayTable
    },
    setup() {
        let map = ''
        let poiGroupLayer = ''
        let baseLayer = ''
        const playControl = ref()
        const playTable = ref()

        onMounted(() => {
            map = L.map('map', {
                // 显示中心
                center: [30.5217, 114.3948],
                // 当前显示等级
                zoom: 18
            })
            L.tileLayer.chinaProvider('GaoDe.Normal.Map').addTo(map)
            poiGroupLayer = new L.FeatureGroup().addTo(map)
            baseLayer = new L.FeatureGroup().addTo(map)
            getPlayBackList()
        })

        const playBack = reactive({
            data: []
        })
        // 获取数据
        const getPlayBackList = async () => {
            const res = await getPlayBackListApi({})
            let data = res.data.list
            data.forEach((item) => {
                item.location = [item.lat, item.lng]
            })
            playBack.data = data
            playControl.value.playBack.data = data
            playControl.value.playBack.time = dayjs(data[0].gpsTime).format('YYYY-MM-DD HH:mm:ss')
            playTable.value.list = data
            if (poiGroupLayer) {
                poiGroupLayer.clearLayers()
            }
            showBase()
            showMarker(0)
        }

        // 绘制线路和起止地点
        let line = []
        function showBase() {
            line = []
            if (baseLayer) {
                baseLayer.clearLayers()
            }
            playBack.data.forEach((item) => {
                line.push(item.location)
            })
            const polyline = L.polyline([...line], {
                // 线颜色
                color: 'blue'
            }).addTo(baseLayer)

            L.polylineDecorator(
                polyline,
                {
                    patterns: [
                        {
                            offset: '80',
                            repeat: '80',
                            symbol: L.Symbol.marker({
                                rotate: true,
                                markerOptions: {
                                    icon: L.icon({
                                        iconUrl: '/src/assets/img/map/jiantou.png',
                                        iconAnchor: [8, 8]
                                    })
                                }
                            })
                        }
                    ]
                }
            ).addTo(baseLayer)

            L.marker(playBack.data[0].location, {
                icon: getMapBasicIconRequire['start'],
                zIndexOffset: 3000
            }).addTo(baseLayer)

            L.marker(playBack.data[playBack.data.length - 1].location, {
                icon: getMapBasicIconRequire['end'],
                zIndexOffset: 3000
            }).addTo(baseLayer)
            map.fitBounds(baseLayer.getBounds())
        }

        // 展示图标
        function showMarker(val) {
            if (poiGroupLayer) {
                poiGroupLayer.clearLayers()
            }
            L.marker(playBack.data[val].location, {
                icon: getMapBasicIconRequire['run'],
                zIndexOffset: 4000
            }).addTo(poiGroupLayer)
        }

        return {
            playBack,
            playControl,
            showMarker,
            playTable
        }
    }
})
</script>

<style scoped lang='scss'>
  .mapBase {
    width: 100%;
    height: 100%;
    position: relative;

    .map {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
    }
  }
</style>
