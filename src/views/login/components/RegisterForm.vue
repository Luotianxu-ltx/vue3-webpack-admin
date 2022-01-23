<template>
    <div ref="signup" class="box signup">
        <ChangeLanguage class="language"></ChangeLanguage>
        <h1>{{ $t('login.registerTitle') }}</h1>

        <el-form
            class="form"
            action=""
            ref="ruleForm"
            :model="registerInfo"
            :rules="rules"
        >
            <el-form-item class="item" prop="username">
                <el-input
                    class="item"
                    v-model="registerInfo.username"
                    :placeholder="$t('login.loginUser')"
                    :prefix-icon="User"
                    size="default"
                    clearable
                />
            </el-form-item>
            <el-form-item class="item" prop="password">
                <el-input
                    class="item"
                    v-model="registerInfo.password"
                    :placeholder="$t('login.loginPassword')"
                    :prefix-icon="Lock"
                    show-password
                    size="default"
                    clearable
                />
            </el-form-item>
            <el-form-item class="item" prop="password">
                <el-input
                    class="item"
                    v-model="registerInfo.passwordAgain"
                    :placeholder="$t('login.loginPasswordAgain')"
                    :prefix-icon="Lock"
                    show-password
                    size="default"
                    clearable
                />
            </el-form-item>
        </el-form>

        <el-button class="button" type="primary" @click="registerSubmit">
            {{ $t('login.register') }}
        </el-button>
        <p class="sign">
            {{ $t('login.registerPrompt') + '?' }}
            <span @click="changeToLogin">
                {{ $t('login.registerToLogin') }}
            </span>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {User, Lock} from '@element-plus/icons-vue'
import ChangeLanguage from '@/components/changeLanguage/ChangeLanguage.vue'
import { registerApi } from '@/api/system/userApi'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Register',
    components: {
        ChangeLanguage
    },
    setup(props, context) {
        const { t } = useI18n()

        const signup = ref()
        const ruleForm = ref()

        const registerInfo = reactive({
            username: '',
            password: '',
            passwordAgain: ''
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

        function changeToSignup() {
            signup.value.style.transform = 'rotateY(0deg)'
        }

        function changeToLogin() {
            context.emit('changeToLogin')
            ruleForm.value.clearValidate()
            signup.value.style.transform = 'rotateY(180deg)'
        }

        function registerSubmit() {
            ruleForm.value.validate(async (valid: unknown) => {
                if (valid) {
                    const res:any = await registerApi({
                        username: registerInfo.username,
                        password: registerInfo.password
                    })

                    if (res.status === 200) {
                        ElMessage.success(res.message)
                        changeToLogin()
                    } else {
                        ElMessage.warning(res.message)
                    }
                } else {
                    return false
                }
            })
        }
        return {
            signup,
            registerInfo,
            changeToSignup,
            changeToLogin,
            rules,
            registerSubmit,
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
            margin: 30px 0 10px 0;
        }

        .button {
            width: 200px;
            height: 30px;
            margin-bottom: 20px;
        }
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
