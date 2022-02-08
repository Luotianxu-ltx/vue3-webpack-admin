<template>
    <div class="systemSetting">
        <el-tooltip content="系统设置" placement="bottom" effect="light">
            <Icon icon="setting" :font="25"></Icon>
        </el-tooltip>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Icon from '@/components/icon/Icon'

export default defineComponent({
    name: 'Setting',
    components: {
        Icon
    }
})
</script>

<style scoped lang="scss">
    .systemSetting {
        cursor: pointer;
    }
</style>
