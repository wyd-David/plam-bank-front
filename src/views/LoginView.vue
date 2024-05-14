<template>
    <section class="ai-bank-login-page">
        <div class="login-core-box">
            <div class="title">AI云账户系统</div>
            <el-card class="content-card">
                <div class="label">欢迎登录</div>
                <el-form :model="form" label-width="auto" style="max-width: 600px">
                    <el-form-item>
                        <el-input v-model="form.phone" class="login-ipt" size="large">
                            <template #prefix>
                                <el-icon :size="20">
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.password" class="login-ipt" size="large" show-password>
                            <template #prefix>
                                <el-icon :size="20">
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox value="Online activities" name="type">
                            记住密码
                        </el-checkbox>
                    </el-form-item>
                </el-form>
                <el-button class="login-btn" size="large" type="primary" @click="login">登 录</el-button>
                <div class="login-action">
                    <el-link type="primary" @click="toPage('/register')">注册账号</el-link>
                    <el-divider direction="vertical" />
                    <el-link type="primary" @click="toPage('/reset')">忘记密码</el-link>
                </div>
            </el-card>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { User, Lock } from '@element-plus/icons-vue';
    import { Service } from '@/api/services/Service';
    import { ElMessage } from 'element-plus';
    import { useUserStore } from '@/stores/user';
    import router from '@/router';

    const userStore = useUserStore();

    const  form = reactive({
        password: "",
        phone: "",
    });

    const login = async () => {
        let res = await Service.loginUsingPost(form);
        if (res.code === 0) {
            ElMessage({
                message: '登录成功',
                type: 'success',
                plain: true,
            });
            userStore.userInfo = res.data;
            router.push({
                path: '/account'
            });
        }
    }

    const toPage = (path: string) => {
        router.push({
            path
        });
    }
</script>
<style lang="scss" scoped>
.ai-bank-login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .login-core-box {
        transform: translateY(-80px);
        .title {
            font-size: 28px;
            font-weight: 500;
            color: var(--el-color-primary);
            text-align: center;
            margin-bottom: 24px;
        }
        .content-card {
            .label {
                font-size: 22px;
                font-weight: 600;
                text-align: center;
            }
            .login-ipt {
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
            .login-btn {
                width: 100%;
                font-size: 14px;
            }
            .login-action {
                text-align: center;
                margin-top: 24px;
            }
        }
    }
}
</style>