<template>
    <LayoutQuery :loading="tableData.loading">
        <template #fl>
            <div class="query-item">
                <el-input
                    v-model="tableData.name"
                    placeholder="请输入用户姓名"
                    clearable
                ></el-input>
            </div>
            <div class="query-item">
                <el-select
                    v-model="tableData.type"
                    placeholder="请选择用户角色"
                    clearable
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <div class="query-item">
                <el-date-picker
                    v-model="tableData.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :shortcuts="shortcuts"
                    clearable
                ></el-date-picker>
            </div>
            <div class="query-item">
                <el-button
                    @click="getNewsInfo(1)"
                    type="primary"
                    :icon="Search"
                >
                    查询
                </el-button>
            </div>
        </template>
        <template #fr>
            <div class="query-item">
                <el-button
                    @click="addNewsInfo"
                    type="success"
                    :icon="CirclePlus"
                >
                    新增
                </el-button>
            </div>
            <div class="query-item">
                <el-button @click="addNewsInfo" type="danger" :icon="Delete">
                    多选删除
                </el-button>
            </div>
        </template>
        <template #table>
            <el-table
                ref="table"
                :data="tableData.data"
                stripe
                border
                highlight-current-row
                empty-text="暂无数据"
                height="100%"
            >
                <template #empty>
                    <el-empty description="暂无数据"></el-empty>
                </template>
                <el-table-column type="selection" align="center" width="40" />
                <el-table-column
                    prop="id"
                    align="center"
                    label="ID"
                    width="50"
                />
                <el-table-column
                    prop="name"
                    align="center"
                    label="姓名"
                    width="100"
                />
                <el-table-column
                    prop="name"
                    align="center"
                    label="头像"
                    width="80"
                >
                    <template #default="scope">
                        <el-avatar :src="scope.row.img"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    align="center"
                    label="年龄"
                    width="60"
                />
                <el-table-column
                    prop="sex"
                    align="center"
                    label="性别"
                    width="60"
                >
                    <template #default="scope">
                        {{ Number(scope.row.sex) === 1 ? '男' : '女' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    align="center"
                    label="角色"
                    width="90"
                >
                    <template #default="scope">
                        <el-tag type="danger" v-if="scope.row.type === 0">
                            超级管理员
                        </el-tag>
                        <el-tag type="warning" v-if="scope.row.type === 1">
                            管理员
                        </el-tag>
                        <el-tag type="success" v-if="scope.row.type === 2">
                            用户
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    align="center"
                    label="手机号"
                    width="150"
                />
                <el-table-column prop="email" align="center" label="邮箱" />
                <el-table-column prop="city" align="center" label="城市" />
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态"
                    width="70"
                >
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.status"
                            :active-value="1"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            inline-prompt
                            active-text="启"
                            inactive-text="禁"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    align="center"
                    label="添加时间"
                    width="120"
                />
                <el-table-column
                    prop="edit_time"
                    align="center"
                    label="修改时间"
                    width="120"
                />
                <el-table-column
                    prop="id"
                    align="center"
                    fixed="right"
                    label="操作"
                    width="180"
                >
                    <template #default="scope">
                        <el-button
                            type="info"
                            @click="deleteInfo(scope.row.id)"
                            :icon="Edit"
                        >
                            修改
                        </el-button>
                        <el-button
                            type="danger"
                            @click="deleteInfo(scope.row.id)"
                            :icon="Delete"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #footer>
            <div class="query-item">
                <el-pagination
                    layout="total, prev, pager, next"
                    v-model:currentPage="tableData.pageIndex"
                    :page-size="tableData.pageSize"
                    :total="tableData.total"
                ></el-pagination>
            </div>
        </template>
    </LayoutQuery>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowReadonly, watch } from 'vue'
import {
    getUserListApi,
    deleteUserApi,
    addUserApi
} from '@/api/system/userApi'
import LayoutQuery from '@/components/layoutQuery/LayoutQuery.vue'
import { Search, Edit, Delete, CirclePlus } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
    name: 'User',
    components: { LayoutQuery },
    setup() {
        const options = shallowReadonly([
            {
                value: '0',
                label: '超级管理员'
            },
            {
                value: '1',
                label: '管理员'
            },
            {
                value: '2',
                label: '用户'
            }
        ])

        const shortcuts = ref([
            {
                text: '上周',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                    return [start, end]
                }
            },
            {
                text: '上月',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                    return [start, end]
                }
            },
            {
                text: '前3周',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                    return [start, end]
                }
            }
        ])
        // 查询列表
        const table = ref()
        const tableData = reactive({
            name: '',
            type: '',
            time: '',
            pageIndex: 1,
            pageSize: 25,
            total: 0,
            data: [],
            loading: false
        })
        const getNewsInfo = async (pageIndex?: number) => {
            if (pageIndex) {
                tableData.pageIndex = pageIndex
            }
            tableData.loading = true
            const res = await getUserListApi({
                pageIndex: tableData.pageIndex,
                pageSize: tableData.pageSize
            })
            tableData.data = res.data.list
            tableData.total = res.data.total
            tableData.loading = false
        }

        watch(
            () => tableData.pageIndex,
            (value) => {
                tableData.pageIndex = value
                getNewsInfo()
            }
        )

        // 删除用户
        const deleteInfo = (id: any) => {
            ElMessageBox.confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            })
                .then(async () => {
                    const res = await deleteUserApi({ id: id })
                    if (res.status === 200) {
                        ElMessage.success('删除成功!')
                        await getNewsInfo()
                    }
                })
                .catch(() => {
                    ElMessage.warning('取消删除!')
                })
        }

        // 新增用户
        const addNewsInfo = async () => {
            const res = await addUserApi({
                name: '123'
            })
            if (res.status === 200) {
                await getNewsInfo()
            }
        }

        return {
            options,
            getNewsInfo,
            tableData,
            deleteInfo,
            addNewsInfo,
            table,
            Search,
            Edit,
            Delete,
            CirclePlus,
            shortcuts
        }
    }
})
</script>

<style scoped lang="scss"></style>
