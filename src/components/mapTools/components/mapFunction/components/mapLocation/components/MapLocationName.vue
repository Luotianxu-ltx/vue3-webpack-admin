<template>
    <div class='tab-content'>
        <el-form ref='nameForm' :model='nameFormInput' :rules='nameFormRules' size='small'>
            <el-form-item prop='name'>
                <el-input class='input' v-model='nameFormInput.name' placeholder='请输入名称'>
                    <template #prepend>名称</template>
                </el-input>
            </el-form-item>
            <el-form-item prop='city'>
                <el-input class='input' v-model='nameFormInput.city' placeholder='请输入城市'>
                    <template #prepend>城市</template>
                </el-input>
            </el-form-item>
            <el-button class='btn' type='primary' :icon='Search' :loading='loading' @click='searchName()'>搜索</el-button>
        </el-form>
        <ul class='item' v-show='list.data.length > 0' v-for='(item,index) in list.data' :key='index'
            @click='move(item, 1)'>
            <li>{{ item.name }}</li>
            <li>{{ item.pname }}>{{ item.cityname }}>{{ item.adname }}</li>
        </ul>
    </div>
    <div class='tab-page'>
        <el-pagination class='page' small hide-on-single-page layout='prev, pager, next' :total='list.total'
                       :pager-count='5'
                       :page-size='list.pageSize' v-model:currentPage='list.currentPage'></el-pagination>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { getMapPOIApi } from '@/api/map/mapGaodeApi'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons'

export default defineComponent({
    name: 'MapLocationName',
    setup(props, context) {
        // 按地名搜索
        const nameForm = ref()
        const nameFormInput = reactive({
            name: '',
            city: ''
        })
        const nameFormRules = {
            name: [
                {
                    required: true,
                    message: '请输入地址',
                    trigger: 'blur'
                }
            ]
        }
        const list = reactive({
            data: {},
            currentPage: 1,
            pageSize: 6,
            total: 0
        })
        watch(() => list.currentPage, () => {
            searchName()
        })
        const loading = ref(false)
        const searchName = async () => {
            nameForm.value.validate(async (valid) => {
                if (valid) {
                    loading.value = true
                    const res = await getMapPOIApi({
                        keywords: nameFormInput.name,
                        city: nameFormInput.city,
                        page: list.currentPage,
                        offset: list.pageSize,
                        key: `${process.env.VUE_APP_MAP_AMAP}`
                    })
                    if (Number(res.status) !== 1) {
                        loading.value = false
                        return ElMessage.error('查询错误')
                    }
                    if (res.pois.length === 0) {
                        loading.value = false
                        return ElMessage.warning('没有查到数据！')
                    }
                    list.data = res.pois
                    list.total = Number(res.count)
                    loading.value = false
                    move(list.data, 0)
                } else {
                    return false
                }
            })
        }

        // 遍历所有结果添加标记 type 0 全部 1 单独
        function move(data, type) {
            const arr = []
            if (!type) {
                data.forEach((item) => {
                    const lat = Number(item.location.split(',')[0])
                    const lng = Number(item.location.split(',')[1])
                    arr.push({
                        name: item.name,
                        address: `${item.pname}>${item.cityname}>${item.adname}`,
                        local: [lng, lat]
                    })
                })
            } else {
                const lat = Number(data.location.split(',')[0])
                const lng = Number(data.location.split(',')[1])
                arr.push({
                    name: data.name,
                    address: `${data.pname}>${data.cityname}>${data.adname}`,
                    local: [lng, lat]
                })
            }
            context.emit('move', arr)
        }

        function clear() {
            nameForm.value.resetFields()
            list.data = {}
            list.currentPage = 1
            list.total = 0
            loading.value = false
        }

        return {
            nameForm,
            nameFormInput,
            nameFormRules,
            list,
            searchName,
            Search,
            move,
            clear,
            loading
        }
    }
})
</script>

<style scoped lang='scss'>
    .tab-content {
        margin: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .input {
            margin-bottom: 5px;
        }

        .btn {
            width: 100%;
        }
    }

    .tab-page {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .el-form-item {
        margin-bottom: 0;
        overflow: hidden;
    }

    .item {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 2px;
        font-size: 14px;
        padding: 2px;
        overflow: hidden;
        box-sizing: border-box;
        margin-top: 5px;

        li {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            margin-top: 2px;
            cursor: pointer;
        }
    }

    .page {
        margin-top: 5px;
    }

    ::v-deep(.el-pagination) {
        .btn-prev {
            background-color: #fff !important;
        }

        .number {
            background-color: #fff !important;
        }

        .btn-next {
            background-color: #fff !important;
        }

        .active {
            background-color: #fff !important;
        }
    }

</style>
