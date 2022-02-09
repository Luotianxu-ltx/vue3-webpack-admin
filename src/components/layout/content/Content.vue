<template>
    <div class="main">
        <Tags></Tags>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tags from '@/components/layout/aside/components/Tags.vue'

export default defineComponent({
    name: 'Content',
    components: {
        Tags
    }
})
</script>

<style scoped lang="scss">
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #eee;
        overflow: hidden;
    }
</style>
