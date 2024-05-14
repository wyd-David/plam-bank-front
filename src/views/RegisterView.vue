<template>
    <section class="ai-bank-register-page">
        <div class="register-core-box">
            <div class="title">AI云账户系统</div>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="手机号（必填）">
                    <el-input v-model="form.phone" class="register-ipt" size="large" placeholder="请输入手机号">
                        <template #prefix>
                            <el-icon :size="20">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" class="register-ipt" size="large" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon :size="20">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.confirmPwd" class="register-ipt" size="large" show-password placeholder="请再次输入密码">
                        <template #prefix>
                            <el-icon :size="20">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="手机验证码">
                    <div class="phone-code">
                        <el-input v-model="form.validCode" class="reset-ipt" size="large" placeholder="请输入验证码"></el-input>
                        <el-button type="primary" @click="getCode" :disabled="loading">
                            获取{{ loading ? `（${count}）` : '' }}
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="privacy-agreement">
                        <el-checkbox v-model="form.privacy" value="Online activities" name="type">
                            同意隐私协议
                        </el-checkbox>
                    </div>
                </el-form-item>
            </el-form>
            <el-button style="margin-left: 110px;" type="primary" @click="submit">注册提交</el-button>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { User, Lock } from '@element-plus/icons-vue';
    import { Service } from '@/api/services/Service';
    import { ElMessage } from 'element-plus';
    import router from '@/router';

    const  form = reactive({
        phone: '',
        password: '',
        validCode: '',
        privacy: false,
        confirmPwd: ''
    });

    const loading = ref<boolean>(false);
    let count = ref(0);

    const submit = async () => {
        if (form.confirmPwd !== form.password) {
            ElMessage({
                message: '密码输入不一致！',
                type: 'warning',
                plain: true,
            });
            return;
        }
        if (!form.privacy) {
            ElMessage({
                message: '请同意隐私协议',
                type: 'warning',
                plain: true,
            });
            return;
        }
        let res = await Service.registerUsingPost(form);
        if (res.code === 0) {
            ElMessage({
                message: '注册成功',
                type: 'success',
                plain: true,
            });
            router.push({
                path: '/login'
            })
        }
    }

    const getCode = async () => {
        if (!form.phone) {
            ElMessage({
                message: '请输入手机号',
                type: 'warning',
                plain: true,
            });
            return;
        }
        let res = await Service.updateUserInfoUsingGet(form.phone);
        if (res.code === 0) {
            count.value = 120;
            loading.value = true;
            
            const timer = setInterval(() => {
                count.value--
                if (count.value === 0) {
                    loading.value = false;
                    clearInterval(timer);
                }
            }, 1000);
        }
    }

</script>
<style lang="scss" scoped>
.ai-bank-register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .register-core-box {
        width: 500px;
        padding-bottom: 120px;
        .title {
            font-size: 28px;
            font-weight: 500;
            color: var(--el-color-primary);
            text-align: center;
            margin-bottom: 24px;
        }
        .label {
            font-size: 22px;
            font-weight: 600;
            text-align: center;
        }
        .register-ipt {
            :deep(.el-input__wrapper) {
                box-shadow: none;
                border-bottom: 1px solid var(--el-border-color);
                border-radius: 0;
            }
        }
        :deep(.el-card__body) {
            padding: 32px 56px;
            width: 560px;
        }
        .register-btn {
            width: 100%;
            font-size: 14px;
        }
        .register-action {
            text-align: center;
            margin-top: 24px;
        }
        .privacy-agreement {
            margin-left: 110px;
        }
        .phone-code {
            display: flex;
            align-items: end;
            .el-button {
                margin-left: 16px;
            }
        }
    }
}
</style>