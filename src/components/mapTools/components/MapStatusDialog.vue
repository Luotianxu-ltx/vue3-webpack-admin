<template>
    <div class='mapStatus'>
        <el-button class='btn' type='primary' @click='showDialog'>地图状态</el-button>
        <Dialog v-model:visible='dialogVisible' title='地图状态' width='1000' visible>
            <template #content>
                <el-descriptions
                    class='margin-top'
                    :column='3'
                    border
                >
                    <el-descriptions-item :span='3'>
                        <template #label>
                            中心点经纬度
                        </template>
                        经度：
                        <el-tag>{{ latitude }}</el-tag> &nbsp;&nbsp;纬度：
                        <el-tag>{{ longitude }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            当前缩放级别
                        </template>
                        <el-tag>{{ zoom }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            最小缩放级别
                        </template>
                        <el-tag>{{ minZoom }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            最大缩放级别
                        </template>
                        <el-tag>{{ maxZoom }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item :span='3'>
                        <template #label>
                            地图范围
                        </template>
                        经度：
                        <el-tag>{{ bound.xmin }}</el-tag>
                        至&nbsp;<el-tag>{{ bound.xmax }}</el-tag>
                        纬度：
                        <el-tag>{{ bound.ymin }}</el-tag>
                        至&nbsp;<el-tag>{{ bound.ymax }}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </template>
        </Dialog>
    </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import Dialog from '@/components/dialog/Dialog.vue'

export default defineComponent({
    name: 'MapStatusDialog',
    components: {
        Dialog
    },
    setup() {
        let baseMap = ''

        function initMapStatus(map) {
            baseMap = map
        }

        // 是否显示弹窗
        const dialogVisible = ref(false)

        function showDialog() {
            getMapStatus()
            dialogVisible.value = true
        }

        // 获取地图状态
        const data = reactive({
            latitude: '',
            longitude: '',
            minZoom: '',
            maxZoom: '',
            zoom: '',
            bound: {
                ymin: '',
                ymax: '',
                xmin: '',
                xmax: ''
            }
        })

        function getMapStatus() {
            data.latitude = baseMap.getCenter().lat
            data.longitude = baseMap.getCenter().lng
            data.minZoom = baseMap.getMinZoom()
            data.maxZoom = baseMap.getMaxZoom()
            data.zoom = baseMap.getZoom()
            const ex = baseMap.getBounds()
            data.bound.ymin = ex._southWest.lat
            data.bound.xmin = ex._southWest.lng
            data.bound.ymax = ex._northEast.lat
            data.bound.xmax = ex._northEast.lng
        }

        return {
            dialogVisible,
            showDialog,
            initMapStatus,
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang='scss'>
    .mapStatus {
        width: 100%;

        .btn {
            width: 90%;
            height: 30px;
            margin: 0 0 5px 10px;
        }
    }
</style>
