<template>
    <div ref="login" class="box login">
        <ChangeLanguage class="language"></ChangeLanguage>
        <h1>{{ $t('login.loginTitle') }}</h1>
        <el-form
            class="form"
            action=""
            ref="ruleForm"
            :model="loginInfo"
            :rules="rules"
        >
            <el-form-item prop="username">
                <el-input
                    v-model="loginInfo.username"
                    :placeholder="$t('login.loginUser')"
                    :prefix-icon="User"
                    size="default"
                    clearable
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginInfo.password"
                    :placeholder="$t('login.loginPassword')"
                    :prefix-icon="Lock"
                    show-password
                    size="default"
                    clearable
                />
            </el-form-item>
        </el-form>
        <el-button class="button" type="primary" @click="loginSubmit">
            {{ $t('login.login') }}
        </el-button>
        <p class="sign">
            {{ $t('login.loginPrompt') + '?' }}
            <span @click="changeToSignup">
                {{ $t('login.loginToRegister') }}
            </span>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import {User, Lock} from '@element-plus/icons-vue'
import ChangeLanguage from '@/components/changeLanguage/ChangeLanguage.vue'
import {
    getUserInfoApi,
    getUserPermissionsApi,
    loginApi
} from '@/api/system/userApi'
import { ElMessage } from 'element-plus'
import { Key } from '@/store'
import { flattenedTree } from '@/utils/tree'

export default defineComponent({
    name: 'LoginForm',
    components: {
        ChangeLanguage
    },
    setup(props, context) {
        const router = useRouter()
        const store = useStore(Key)
        const { t } = useI18n()
        const login = ref()
        const ruleForm = ref()

        const loginInfo = reactive({
            username: 'admin',
            password: '1'
        })

        const rules = {
            username: [
                {
                    required: true,
                    message: t('login.userNamePrompt'),
                    trigger: 'blur'
                }
            ],
            password: [
                {
                    required: true,
                    message: t('login.passwordPrompt'),
                    trigger: 'blur'
                }
            ]
        }
        function loginSubmit() {
            ruleForm.value.validate(async (valid: unknown) => {
                if (valid) {
                    const res: any = await loginApi(loginInfo)

                    if (res.status === 200) {
                        const userInfo = await getUserInfoApi({
                            id: res.data.id
                        })
                        const list = await getUserPermissionsApi({
                            id: res.data.id
                        })
                        console.log(userInfo)
                        console.log(userInfo.data)
                        if (
                            userInfo.status === 200 &&list.status === 200) {
                            const data = flattenedTree(list.data.list)
                            store.commit('user/SET_USER_INFO',JSON.stringify(userInfo.data))
                            store.commit('user/SET_USER_PERMISSIONS', data)
                        } else {
                            return ElMessage.warning('获取用户信息失败，请稍后重试!')
                        }
                        ElMessage.success(res.message)
                        await router.push('/system/user')
                    } else {
                        ElMessage.warning(res.message)
                    }
                } else {
                    return false
                }
            })
        }

        function changeToSignup() {
            context.emit('changeToSignup')
            ruleForm.value.clearValidate()
            login.value.style.transform = 'rotateY(180deg)'
        }

        function changeToLogin() {
            login.value.style.transform = 'rotateY(0deg)'
        }

        return {
            login,
            loginInfo,
            loginSubmit,
            changeToSignup,
            changeToLogin,
            rules,
            ruleForm,
            User,
            Lock
        }
    }
})
</script>

<style scoped lang="scss">
    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 21rem;
        height: 25rem;
        border-radius: 10px;
        backface-visibility: hidden;
        transition: all 0.5s;
        user-select: none;
        padding: 30px;

        .language {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 999;
        }

        .form {
            margin: 40px 0 35px 0;

            .item {
                margin: 10px 0;
            }
        }

        .button {
            width: 200px;
            height: 30px;
            margin-bottom: 20px;
        }
    }

    .login {
        background-color: #fff;
    }

    .signup {
        background-color: #fff;
        transform: rotateY(-108deg);
    }

    .sign {
        color: #888;
        font-size: 14px;

        span {
            color: #0066ff;
            cursor: pointer;
            font-weight: 500;
        }
    }
</style>
