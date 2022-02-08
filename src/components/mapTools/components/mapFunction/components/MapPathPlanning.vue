<template>
    <div>
        <el-button
            class="btnItem"
            type="primary"
            @click="showMapLocation"
            v-show="!isShowMapControl"
        >
            路径规划
        </el-button>
        <div
            v-show="mapControlSign.includes('pathPlanning') && isShowMapControl"
        >
            <div class="toolContent">
                <div class="main">
                    <div class="left">
                        <el-icon :size="20">
                            <Sort @click="change()"></Sort>
                        </el-icon>
                    </div>
                    <div class="right">
                        <el-form
                            ref="localForm"
                            :model="localFormInput"
                            :rules="localFormRules"
                        >
                            <el-form-item prop="beginName">
                                <el-input
                                    class="input"
                                    v-model="localFormInput.beginName"
                                    placeholder="请点击图标选择起点"
                                >
                                    <template #append>
                                        <MapLocationInput
                                            ref="mapLocationInput"
                                            @update="getLocation"
                                        ></MapLocationInput>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="endName">
                                <el-input
                                    class="input"
                                    v-model="localFormInput.endName"
                                    placeholder="请点击图标选择终点"
                                >
                                    <template #append>
                                        <MapLocationInput
                                            ref="mapLocationInput1"
                                            @update="getLocation1"
                                        ></MapLocationInput>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <el-radio-group class="choose" v-model="type">
                    <el-radio :label="0">步行</el-radio>
                    <el-radio :label="1">驾车</el-radio>
                </el-radio-group>
                <el-button
                    class="btn"
                    type="primary"
                    :icon="Search"
                    @click="search()"
                >
                    搜索
                </el-button>
                <div class="list" v-show="isShowList">
                    <div class="top">
                        <span>距离：{{ list.distance }}米</span>
                        <span>
                            时间：{{ formatterSToHMS(Number(list.duration)) }}
                        </span>
                    </div>
                    <div class="bottom">
                        <div
                            class="item"
                            v-for="(item, index) in list.data"
                            :key="index"
                        >
                            <div class="info">
                                <span>距离：{{ item.distance }}米</span>
                                <span>时间：{{ item.duration }}</span>
                            </div>
                            {{ item.instruction }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import L from '@/lib/leaflet'
import { Search, Sort } from '@element-plus/icons'
import MapLocationInput from '@/components/mapLocationInput/MapLocationInput.vue'
import { getPathDrivingApi, getPathWalkApi } from '@/api/map/mapGaodeApi'
import { formatterSToHMS } from '@/utils/time'

export default defineComponent({
    name: 'MapPathPlanning',
    components: {
        Sort,
        MapLocationInput
    },
    props: {
        mapControl: { // 父组件 v-model 没有指定参数名，则默认是 modelValue
            default: []
        },
        showControl: {
            default: false
        }
    },
    setup(props, { emit }) {
        // 初始化
        let baseMap = ''
        let poiGroupLayer = ''
        const mapLocationInput = ref()
        const mapLocationInput1 = ref()

        function initMapPathPlanning(map) {
            baseMap = map
            mapLocationInput.value.initMapLocationInput(baseMap)
            mapLocationInput1.value.initMapLocationInput(baseMap)
            poiGroupLayer = new L.FeatureGroup().addTo(baseMap)
        }

        // 是否展示具体功能
        const isShowMapControl = ref(props.showControl)
        watch(() => props.showControl, () => { isShowMapControl.value = props.showControl })
        // 控制选择哪个具体功能
        const mapControlSign = ref(props.mapControl)
        watch(() => props.mapControl, () => { mapControlSign.value = props.mapControl })

        function showMapLocation() {
            emit('update:showControl', true)
            emit('update:mapControl', ['pathPlanning'])
        }

        // 搜索
        const localForm = ref()
        const type = ref(0)
        const localFormInput = reactive({
            begin: '',
            beginName: '',
            end: '',
            endName: ''
        })
        const localFormRules = {
            beginName: [
                {
                    required: true,
                    message: '请输入起点',
                    trigger: 'blur'
                }
            ],
            endName: [
                {
                    required: true,
                    message: '请输入终点',
                    trigger: 'blur'
                }
            ]
        }

        // 获取定位
        function getLocation(data) {
            localFormInput.beginName = data.name
            localFormInput.begin = `${data.latlng.lng},${data.latlng.lat}`
        }

        function getLocation1(data) {
            localFormInput.endName = data.name
            localFormInput.end = `${data.latlng.lng},${data.latlng.lat}`
        }

        const list = reactive({
            distance: '',
            duration: '',
            data: {}
        })
        const isShowList = ref(false)
        const search = async () => {
            poiGroupLayer.clearLayers()
            localForm.value.validate(async (valid) => {
                if (valid) {
                    let res = {}
                    if (type.value === 0) {
                        res = await getPathWalkApi({
                            origin: localFormInput.begin,
                            destination: localFormInput.end,
                            key: `${process.env.VUE_APP_MAP_AMAP}`
                        })
                    } else {
                        res = await getPathDrivingApi({
                            origin: localFormInput.begin,
                            destination: localFormInput.end,
                            key: `${process.env.VUE_APP_MAP_AMAP}`
                        })
                    }
                    isShowList.value = true
                    list.data = res.route.paths[0].steps
                    list.distance = res.route.paths[0].distance
                    list.duration = res.route.paths[0].duration
                    const arr = []
                    list.data.forEach((item) => {
                        const listRes = item.polyline.split(';')
                        listRes.forEach((child) => {
                            const childlng = child.split(',')
                            arr.push([
                                Number(childlng[1]),
                                Number(childlng[0])
                            ])
                        })
                    })
                    L.polyline(arr, {
                        color: 'red'
                    }).addTo(poiGroupLayer)
                    baseMap.fitBounds(poiGroupLayer.getBounds())
                } else {
                    return false
                }
            })
        }

        // 切换起点和终点
        function change() {
            const a = localFormInput.end
            localFormInput.end = localFormInput.begin
            localFormInput.begin = a
            const b = localFormInput.endName
            localFormInput.endName = localFormInput.beginName
            localFormInput.beginName = b
            mapLocationInput.value.set({
                name: localFormInput.beginName,
                latlng: {
                    lat: Number(localFormInput.begin.split(',')[1]),
                    lng: Number(localFormInput.begin.split(',')[0])
                }
            })
            mapLocationInput1.value.set({
                name: localFormInput.endName,
                latlng: {
                    lat: Number(localFormInput.end.split(',')[1]),
                    lng: Number(localFormInput.end.split(',')[0])
                }
            })
        }

        // 返回主页时清空表单
        watch(isShowMapControl, (value) => {
            if (value === false) {
                localForm.value.resetFields()
                list.distance = ''
                list.duration = ''
                list.data = {}
                isShowList.value = false
                mapLocationInput.value.clear()
                mapLocationInput1.value.clear()
                poiGroupLayer.clearLayers()
            }
        })

        return {
            initMapPathPlanning,
            showMapLocation,
            isShowMapControl,
            mapControlSign,
            Search,
            localForm,
            localFormInput,
            localFormRules,
            search,
            change,
            mapLocationInput,
            mapLocationInput1,
            getLocation1,
            getLocation,
            isShowList,
            list,
            type,
            formatterSToHMS
        }
    }
})
</script>

<style scoped lang="scss">
    .btnItem {
        width: 100px;
        height: 30px;
        margin: 2px;
        border-radius: 5px;
    }

    .toolContent {
        margin: 5px;

        .main {
            display: flex;

            .left {
                width: 10%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

            .right {
                width: 90%;

                .input {
                    margin-bottom: 5px;
                }
            }
        }

        .btn {
            width: 100%;
        }

        .choose {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .list {
            font-size: 14px;
            margin-top: 5px;

            .top {
                span {
                    &:nth-child(2) {
                        margin-left: 20px;
                    }
                }
            }

            .bottom {
                margin-top: 5px;

                .item {
                    padding: 2px;
                    border: 1px solid #ccc;
                    margin-top: 5px;
                    border-radius: 2px;

                    .info {
                        span {
                            &:nth-child(2) {
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

    .el-form-item {
        margin-bottom: 0;
        overflow: hidden;
    }
</style>
