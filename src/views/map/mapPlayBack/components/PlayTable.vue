<template>
  <div class="playTable">
    <el-table
      :data="list"
      ref="table"
      stripe
      :border="true"
      highlight-current-row
      height='100%'>
      <el-table-column type="index" align="center" width="60" label='序号'/>
      <el-table-column prop="gpsTime" align="center" label="时间" width='90'>
        <template #default="scope">
          {{ formatterTime(scope.row.gpsTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="lat" align="center" label="纬度"/>
      <el-table-column prop="lng" align="center" label="经度"/>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
    name: 'PlayTable',
    setup () {
        const list = ref()
        function formatterTime (val:any) {
            return dayjs(val).format('HH:mm:ss')
        }

        const table = ref()
        function setCurrentRow (val:any) {
            table.value.setCurrentRow(val)
        }
        return {
            list,
            formatterTime,
            table,
            setCurrentRow
        }
    }
})
</script>

<style scoped lang="scss">
.playTable {
  position: absolute;
  top: 10px;
  right: 1%;
  z-index: 2;
  width: 380px;
  height: 85%;
  background-color: red;
}
</style>
