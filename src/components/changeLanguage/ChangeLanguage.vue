<template>
    <div class="changeLanguage">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <el-tooltip content="语言" placement="right" effect="light">
                    <Icon icon="duoyuyan" :font="font" :color="colorFont"></Icon>
                </el-tooltip>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="item in options"
                        :key="item.value"
                        :command="item.value"
                        :disabled="item.value === language"
                    >
                        {{ item.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowReadonly } from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
import Icon from '@/components/icon/Icon.vue'
import useCurrentInstance from '@/utils/useCurrentInstance'

export default defineComponent({
    name: 'ChangeLanguage',
    components: {
        Icon
    },
    props: {
        fontSize: {
            required: false,
            type: Number,
            default: 24
        },
        color: {
            required: false,
            type: String,
            default: '#000'
        }
    },
    setup(props) {
        const store = useStore(Key)
        const { proxy } = useCurrentInstance()
        const options = shallowReadonly([
            {
                value: 'zh',
                label: '汉语'
            },
            {
                value: 'en',
                label: 'English'
            }
        ])

        // 当前系统语言
        const language = computed(() => store.state.system?.SYSTEM_LANGUAGE)

        const handleCommand = (command: string) => {
            store.commit('system/SET_SYSTEM_LANGUAGE', command) // 存储
            proxy.$I18n.global.locale = command
        }

        const font = computed(() => props.fontSize)
        const colorFont = computed(() => props.color)

        return {
            options,
            handleCommand,
            font,
            colorFont,
            language
        }
    }
})
</script>

<style scoped lang="scss">
    .changeLanguage {
        cursor: pointer;
    }
</style>
