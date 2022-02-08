<template>
    <div class="map">
        <MapBase class="mapBase" @mapInit="mapInit"></MapBase>
        <MapDraw class="mapDraw" ref="mapDraw"></MapDraw>
        <MapTools class="mapTools" ref="mapTools"></MapTools>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MapBase from '@/components/mapBase/MapBase.vue'
import MapDraw from '@/components/mapDraw/MapDraw.vue'
import MapTools from '@/components/mapTools/MapTools.vue'

export default defineComponent({
    name: 'Map',
    components: {
        MapBase,
        MapDraw,
        MapTools
    },
    setup() {
        const mapDraw = ref()
        const mapTools = ref()

        function mapInit(baseMap: any, baseMaoLayer: any, type: string) {
            mapDraw.value.initMapDraw(baseMap)
            mapTools.value.initMapTools(baseMap, baseMaoLayer, type)
        }

        return {
            mapInit,
            mapDraw,
            mapTools
        }
    }
})
</script>

<style scoped lang="scss">
    .map {
        width: 100%;
        height: 100%;
        position: relative;

        .mapBase {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2;
        }

        .mapTools {
            position: absolute;
            z-index: 999;
            top: 30px;
            right: 40px;
        }

        .mapDraw {
            position: absolute;
            z-index: 2;
            top: 30px;
            right: 140px;
        }
    }
</style>
