<template>
  <div class="map">
    <MapBase class="mapBase" @mapInit = 'mapInit'></MapBase>
    <MapDraw class="mapDraw" ref="mapDraw"></MapDraw>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MapBase from '@/components/mapBase/MapBase.vue'
import MapDraw from '@/components/mapDraw/MapDraw.vue'

export default defineComponent({
    name: 'Map',
    components: {
        MapBase,
        MapDraw
    },
    setup () {
        const mapDraw = ref()
        function mapInit (baseMap: any) {
            mapDraw.value.initMapDraw(baseMap)
        }
        return {
            mapInit,
            mapDraw
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
