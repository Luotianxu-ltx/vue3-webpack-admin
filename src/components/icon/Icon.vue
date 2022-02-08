<template>
    <i
        class="icon"
        :class="iconStr"
        :style="{ fontSize: fontSize, color: color, fontWeight: width }"
    ></i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'Icon',
    props: {
        icon: {
            required: true,
            type: String
        },
        font: {
            required: false,
            type: Number,
            default: 18
        },
        color: {
            required: false,
            type: String,
            default: '#252323'
        },
        width: {
            required: false,
            type: Number
        }
    },
    setup(props) {
        const iconStr = computed(() => 'iconfont ' + props.icon)
        const fontSize = computed(() => props.font + 'px')

        return {
            iconStr,
            fontSize
        }
    }
})
</script>

<style scoped lang="scss">
    .icon {
        //width: 24px;
        text-align: center;
    }
</style>
