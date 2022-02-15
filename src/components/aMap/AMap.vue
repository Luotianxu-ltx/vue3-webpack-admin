<template>
    <div id='container'></div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from 'vue'
window.forceWebGL = true
window._AMapSecurityConfig = {
    securityJsCode:'6b3c02797424ff02b092b3b28ef179e6'
}

export default {
    name: 'mapcomtaint',
    setup() {
        const map = shallowRef(null)
        return {
            map
        }
    },
    methods: {
        ininMap() {
            AMapLoader.load({
                key: '859d831539bf9e53715e7908aefc19db', //设置您的key
                version: '2.0',
                plugins: ['AMap.ToolBar', 'AMap.Driving'],
                AMapUI: {
                    version: '1.1',
                    plugins: []

                },
                Loca: {
                    version: '2.0.0'
                }
            }).then((AMap) => {
                this.map = new AMap.Map('container', {
                    viewMode: '3D',
                    zoom: 5,
                    zooms: [2, 22],
                    center: [105.602725, 37.076636]
                })
                let positionArr = [
                    [113.357224, 34.977186],
                    [114.555528, 37.727903],
                    [112.106257, 36.962733],
                    [109.830097, 31.859027],
                    [116.449181, 39.98614]
                ]
                for (let item of positionArr) {
                    let marker = new AMap.Marker({
                        position: [item[0], item[1]]
                    })
                    this.map.add(marker)
                }

            }).catch(e => {
                console.log(e)
            })
        }
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.ininMap()
    }
}
</script>
<style scope>
    #container {
        height: 100%;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }
</style>
