<template>
    <div class="info">
        <el-tooltip content="消息" placement="bottom" effect="light">
            <el-badge :value="12" class="item">
                <i class="iconfont xiaoxi"></i>
            </el-badge>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Info'
})
</script>

<style scoped lang="scss">
    .info {
        cursor: pointer;
    }
</style>
