<template>
    <div class='item'>
        <div class='title' v-show='!isShowMapControl'>地图功能</div>
        <div class='btn' :class="isShowMapControl ? 'btnMargin' : ''">
            <MapRanging ref='mapRanging' v-show='!isShowMapControl'></MapRanging>
            <MapArea v-show='!isShowMapControl'></MapArea>
            <MapNavigation ref='mapNavigation' v-show="mapControlSign.includes('navigation')"></MapNavigation>
            <MapPathPlanning ref='mapPathPlanning' v-show="mapControlSign.includes('pathPlanning')"></MapPathPlanning>
            <MapMark ref='mapMark' v-show="mapControlSign.includes('mapMark')"></MapMark>
            <MapLocation ref='mapLocation' v-show="mapControlSign.includes('mapLocation')"></MapLocation>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MapRanging from '@/components/mapTools/components/mapFunction/components/MapRanging.vue'
import MapNavigation from '@/components/mapTools/components/mapFunction/components/MapNavigation.vue'
import MapPathPlanning from '@/components/mapTools/components/mapFunction/components/MapPathPlanning.vue'
import MapMark from '@/components/mapTools/components/mapFunction/components/MapMark.vue'
import MapLocation from '@/components/mapTools/components/mapLocation/MapLocation.vue'
import MapArea from '@/components/mapTools/components/mapFunction/components/MapArea.vue'

export default defineComponent({
    name: 'MapBtn',
    components: {
        MapRanging,
        MapNavigation,
        MapPathPlanning,
        MapMark,
        MapLocation,
        MapArea
    },
    setup() {
        const mapLocation = ref()
        const mapMark = ref()
        const mapPathPlanning = ref()
        const mapNavigation = ref()
        const mapRanging = ref()

        function initMapFunction(map) {
            mapLocation.value.initMapLocation(map)
            mapMark.value.initMapMark(map)
            mapPathPlanning.value.initMapPathPlanning(map)
            mapNavigation.value.initMapNavigation(map)
            mapRanging.value.initMapRanging(map)
        }

        // 是否显示具体功能
        const isShowMapControl = ref(false)
        // 控制选择哪个具体功能
        const mapControlSign = ref(['navigation', 'pathPlanning', 'mapMark', 'mapLocation'])

        return {
            initMapFunction,
            mapLocation,
            mapMark,
            mapPathPlanning,
            mapNavigation,
            isShowMapControl,
            mapControlSign,
            mapRanging
        }
    }
})
</script>

<style scoped lang='scss'>
    .item {

        .title {
            margin-top: 10px;
            padding: 0 15px;
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 10px;
            border-radius: 5px;
        }

        .btnMargin {
            margin: 0 !important;
        }
    }
</style>
