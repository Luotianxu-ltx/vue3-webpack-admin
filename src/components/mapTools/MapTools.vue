<template>
    <div class='tools'>
        <div class='toolsBox' @click='isShowToolsContent = true'>
            <i class='iconfont gongju'></i>工具箱
        </div>
        <transition name='slide-fade'>
            <div class='content' v-show='isShowToolsContent'>
                <div class='top' id='top'>
                    地图工具箱
                    <div class='closeBtn'>
                        <i class='iconfont guanbiyuan close' @click='isShowToolsContent = false'></i>
                        <i class='iconfont xiangyou close' @click='closeMapControl' v-show='isShowMapControl'></i>
                    </div>
                </div>
                <el-scrollbar height='500px'>
                    <div class='box-content item'>
                        <MapChange ref='mapChange' v-show='!isShowMapControl'></MapChange>
                        <MapFunction ref='mapFunction'></MapFunction>
                        <MapShowSetting ref='mapShowSetting' v-show='!isShowMapControl'></MapShowSetting>
                        <MapStatusDialog ref='mapStatus' v-show='!isShowMapControl'></MapStatusDialog>
                    </div>
                </el-scrollbar>
            </div>
        </transition>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import MapShowSetting from '@/components/mapTools/components/MapShowSetting.vue'
import MapChange from '@/components/mapTools/components/MapChange.vue'
import MapStatusDialog from '@/components/mapTools/components/MapStatusDialog.vue'
import MapFunction from '@/components/mapTools/components/mapFunction/MapFunction.vue'

export default defineComponent({
    name: 'MapTools',
    components: {
        MapChange,
        MapShowSetting,
        MapStatusDialog,
        MapFunction
    },
    setup() {
        // 工具箱是否弹出
        const isShowToolsContent = ref(false)
        // 是否展示具体功能页面
        const isShowMapControl = ref(false)

        // 初始化
        const mapChange = ref()
        const mapFunction = ref()
        const mapShowSetting = ref()
        const mapStatus = ref()

        function initMapTools(map:any, baseMapLayer:any, mapType: string) {
            mapChange.value.initMapChange(map, baseMapLayer, mapType)
            mapShowSetting.value.initMapSetting(map)
            // mapFunction.value.initMapFunction(map)
            mapStatus.value.initMapStatus(map)
        }

        function closeMapControl() {
            // store.commit('system/SET_SYSTEM_MAP_CONTROL', false)
            isShowMapControl.value = false
            // store.commit('system/SET_SYSTEM_MAP_CONTROL_SIGN', ['navigation', 'pathPlanning', 'mapMark', 'mapLocation'])
        }

        return {
            mapChange,
            mapFunction,
            mapShowSetting,
            mapStatus,
            isShowToolsContent,
            initMapTools,
            isShowMapControl,
            closeMapControl
        }
    }
})
</script>

<style scoped lang='scss'>

    .tools {
        position: relative;

        .toolsBox {
            width: 85px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border-radius: 10px;
            border: 1px solid #ccc;
            cursor: pointer;

            &:hover {
                color: #0066ff;
            }
        }

        /* 可以设置不同的进入和离开动画 */
        /* 设置持续时间和动画函数 */
        .slide-fade-inter, .slide-fade-inter-to {
            transform: translateX(-250px);
        }

        .slide-fade-inter-to {
            transform: translateX(0);
        }

        .slide-fade-enter-active {
            transition: all .4s ease;
        }

        .slide-fade-leave-active {
            transition: all .4s ease;
        }

        .slide-fade-leave-to {
            transform: translateX(250px);
        }

        .content {
            position: absolute;
            width: 230px;
            left: -135px;
            top: 0;
            background-color: #fff;
            border-radius: 10px;

            .top {
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                border-bottom: 1px solid #ccc;

                .closeBtn {
                    display: flex;
                    align-items: center;

                    .close {
                        cursor: pointer;
                        font-size: 24px;

                        &:hover {
                            color: #0066ff;
                        }
                    }

                    .xiangyou {
                        font-size: 20px;
                    }
                }
            }

            .item {
                //margin-top: 10px;

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

                    .btnItem {
                        width: 100px;
                        height: 30px;
                        margin: 2px;
                        border-radius: 5px;
                    }
                }
            }

            .box-content {
            }
        }
    }

</style>
