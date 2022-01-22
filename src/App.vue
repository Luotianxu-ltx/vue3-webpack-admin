<template>
    <el-config-provider :size="size" :zIndex="zIndex" :locale="localLanguage">
        <router-view />
    </el-config-provider>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useStore } from 'vuex'
import { Key } from '@/store'
import useCurrentInstance from '@/utils/useCurrentInstance'

export default defineComponent({
    setup() {
        // 多语言
        const store = useStore(Key)
        const languages = computed(() => store.state.system?.SYSTEM_LANGUAGE)
        const localLanguage = computed(() => {
            switch (languages.value) {
            case 'en':
                return en
            case 'zh':
                return zhCn
            default:
                return zhCn
            }
        })
        const { proxy } = useCurrentInstance()
        proxy.$I18n.global.locale = languages.value
            // element组件尺寸
            type Size = 'small' | 'default' | 'large'
            const size = ref<Size>('small')
            return {
                zIndex: 3000,
                size,
                localLanguage
            }
    }
})
</script>
<style lang="scss"></style>
