<template>
    <div class="tab-content">
        <el-form
            ref="localForm"
            :model="localFormInput"
            :rules="localFormRules"
        >
            <el-form-item prop="longitude">
                <el-input
                    class="input"
                    v-model="localFormInput.longitude"
                    placeholder="请输入经度"
                >
                    <template #prepend>经度</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="latitude">
                <el-input
                    class="input"
                    v-model="localFormInput.latitude"
                    placeholder="请输入纬度"
                >
                    <template #prepend>纬度</template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-button
            class="btn"
            type="primary"
            :icon="Search"
            :loading="loading"
            @click="searchLat(localInfo.location)"
        >
            搜索
        </el-button>
        <ul class="item" v-show="localInfo.title" @click="move">
            <li>{{ localInfo.title }}</li>
            <li>
                {{ localInfo.province }}>{{ localInfo.district }}>{{
                    localInfo.township
                }}
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { getMapByLatApi } from '@/api/map/mapGaodeApi'
import { Search } from '@element-plus/icons'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'MapLocationLat',
    setup(props, context) {
        // 按照经纬度搜索
        const localForm = ref()
        const localFormInput = reactive({
            longitude: '',
            latitude: ''
        })
        const localFormRules = {
            longitude: [
                {
                    required: true,
                    message: '请输入经度',
                    trigger: 'blur'
                }
            ],
            latitude: [
                {
                    required: true,
                    message: '请输入纬度',
                    trigger: 'blur'
                }
            ]
        }
        const loading = ref(false)
        const localInfo = reactive({})
        const searchLat = async () => {
            localForm.value.validate(async (valid) => {
                if (valid) {
                    loading.value = true
                    const res = await getMapByLatApi({
                        output: 'JSON',
                        location: `${localFormInput.longitude},${localFormInput.latitude}`,
                        key: `${process.env.VUE_APP_MAP_AMAP}`
                    })
                    if (Number(res.status) !== 1) {
                        return ElMessage.error('查询错误')
                    }
                    if (res.regeocode.formatted_address.length === 0) {
                        loading.value = false
                        return ElMessage.warning('没有查到数据！')
                    }
                    if (res.regeocode.formatted_address.length !== 0) {
                        localInfo.title = res.regeocode.formatted_address
                        localInfo.province =
                                res.regeocode.addressComponent.province
                        localInfo.district =
                                res.regeocode.addressComponent.district
                        localInfo.township =
                                res.regeocode.addressComponent.township
                        localInfo.location =
                                res.regeocode.addressComponent.streetNumber.location
                    }
                    loading.value = false
                } else {
                    return false
                }
            })
        }

        function move() {
            const lat = Number(localInfo.location.split(',')[0])
            const lng = Number(localInfo.location.split(',')[1])
            const arr = []
            arr.push({
                name: localInfo.title,
                address: `${localInfo.province}>${localInfo.district}>${localInfo.township}`,
                local: [lng, lat]
            })
            context.emit('move', arr)
        }

        function clear() {
            localForm.value.resetFields()
            localInfo.title = ''
            localInfo.province = ''
            localInfo.district = ''
            localInfo.township = ''
            localInfo.location = ''
            loading.value = false
        }

        return {
            Search,
            localForm,
            localFormRules,
            localFormInput,
            searchLat,
            clear,
            localInfo,
            loading,
            move
        }
    }
})
</script>

<style scoped lang="scss">
    .tab-content {
        margin: 0 5px;

        .input {
            margin-bottom: 5px;
        }

        .btn {
            width: 100%;
        }
    }

    .el-form-item {
        margin-bottom: 0;
        overflow: hidden;
    }

    .item {
        width: 95%;
        border: 1px solid #ccc;
        margin: 5px;
        border-radius: 2px;
        font-size: 14px;
        padding: 2px;
        overflow: hidden;

        li {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            margin-top: 2px;
            cursor: pointer;
        }
    }
</style>
