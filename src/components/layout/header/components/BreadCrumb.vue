<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
        >
            <el-link
                :underline="false"
                :disabled="index === breadcrumbList.length - 1"
                @click="goto(item.path)"
            >
                {{ item.name }}
            </el-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userRouter = useRouter()
const breadcrumbList = ref()

const initBreadcrumbList = () => {
    breadcrumbList.value = route.matched
}
watch(
    route,
    () => {
        initBreadcrumbList()
    },
    { deep: true, immediate: true }
)

const goto = (val: string) => {
    userRouter.push(val)
}
</script>
<style lang="scss" scoped></style>
