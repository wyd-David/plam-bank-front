<template>
    <section class="ai-bank-reset-page">
        <div class="reset-core-box">
            <div class="title">AI云账户系统</div>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="手机号（必填）">
                    <el-input v-model="form.phone" class="reset-ipt" size="large">
                        <template #prefix>
                            <el-icon :size="20">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" class="reset-ipt" size="large" show-password>
                        <template #prefix>
                            <el-icon :size="20">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.confirmPwd" class="reset-ipt" size="large" show-password>
                        <template #prefix>
                            <el-icon :size="20">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="手机验证码">
                    <div class="phone-code">
                        <el-input v-model="form.validCode" class="reset-ipt" size="large"></el-input>
                        <el-button type="primary">获取</el-button>
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
            <el-button style="margin-left: 110px;" type="primary" @click="reset">提交</el-button>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { User, Lock } from '@element-plus/icons-vue';
    import { Service } from '@/api/services/Service';
    import { ElMessage } from 'element-plus';

    const form = reactive({
        phone: '',
        password: '',
        validCode: '',
        confirmPwd: '',
        privacy: false,
    });

    const reset = async () => {
        let res = await Service.updatePasswordUsingPost(form);
    }
</script>
<style lang="scss" scoped>
.ai-bank-reset-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .reset-core-box {
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
        .reset-ipt {
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
        .reset-btn {
            width: 100%;
            font-size: 14px;
        }
        .reset-action {
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