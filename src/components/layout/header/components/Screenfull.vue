<template>
    <div class="screenfull" @click="click">
        <el-tooltip content="全屏" placement="bottom" effect="light">
            <i
                class="iconfont"
                :class="isFullscreen === true ? 'suoxiao' : 'fullScreen'"
            ></i>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import screenfull from 'screenfull'

const sf = screenfull

export default defineComponent({
    name: 'ScreenFull',
    setup() {
        const isFullscreen = ref(false)

        onMounted(() => {
            if (sf.isEnabled) {
                sf.on('change', change)
                window.addEventListener('keydown', KeyDown, true) // 监听按键事件
            }
        })

        onBeforeUnmount(() => {
            if (sf.isEnabled) {
                sf.off('change', change)
                window.removeEventListener('keydown', KeyDown, false)
            }
        })

        function KeyDown(event: any) {
            if (event.keyCode === 122) {
                click()
                event.returnValue = false
            }
        }

        function change() {
            if (sf.isEnabled) {
                isFullscreen.value = sf.isFullscreen
            }
        }

        function click() {
            if (!sf.isEnabled) {
                ElMessage({
                    message: '您的浏览器不支持!',
                    type: 'warning'
                })
                return false
            }
            sf.toggle()
        }
        return {
            click,
            isFullscreen
        }
    }
})
</script>

<style scoped lang="scss">
    .screenfull {
        cursor: pointer;
    }
</style>
