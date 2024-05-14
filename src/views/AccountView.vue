<template>
    <section class="ai-bank-account-page">
        <div class="account-core-box">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="系统卡号">
                    <el-input v-if="isEdit" v-model="form.cardId" class="account-ipt" size="large"></el-input>
                    <span v-else class="account-txt">{{ form.cardId }}</span>
                </el-form-item>
                <el-form-item v-if="!isEdit" label="账户余额">
                    <span class="account-txt">{{ form.balance }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-if="isEdit" v-model="form.email" class="account-ipt" size="large"></el-input>
                    <span v-else class="account-txt">{{ form.email }}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <el-switch v-if="isEdit" v-model="form.gender" style="--el-switch-off-color: #ff4949" active-text="男" inactive-text="女" inline-prompt />
                    <span v-else class="account-txt">{{ form.gender }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-if="isEdit" v-model="form.nickname" class="account-ipt" size="large"></el-input>
                    <span v-else class="account-txt">{{ form.nickname }}</span>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-if="isEdit" v-model="form.schoolName" class="account-ipt" size="large"></el-input>
                    <span v-else class="account-txt">{{ form.schoolName }}</span>
                </el-form-item>
                <el-form-item label="头像">
                    <el-avatar :src="userStore.userInfo.logo" :size="72" />
                </el-form-item>
            </el-form>
            <el-button style="margin-left: 68px;" type="primary" @click="edit">
                {{ isEdit ? '保存' : '编辑' }}
            </el-button>
            <el-button v-if="isEdit" style="margin-left: 8px;" type="primary" @click="isEdit = false">取消编辑</el-button>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { Service } from '@/api/services/Service';
    import { ElMessage } from 'element-plus';
    import { useUserStore } from '@/stores/user';

    const userStore = useUserStore();

    const form = reactive({
        balance: '',
        cardId: '',
        email: '',
        gender: '',
        id: 0,
        logo: '',
        nickname: '',
        phone: '',
        schoolName: ''
    });

    onMounted(() => {
        setTimeout(() => {
            updateData()
        }, 100)
    })

    const updateData = () => {
        const { userInfo } = userStore;
        form.balance = userInfo.balance || '';
        form.cardId = userInfo.cardId || '';
        form.email = userInfo.email || '';
        form.gender = userInfo.gender || '';
        form.logo = userInfo.logo || '';
        form.nickname = userInfo.nickname || '';
        form.schoolName = userInfo.schoolName || '';
    }

    const isEdit = ref<boolean>(false);

    const edit = async () => {
        if (!isEdit.value) {
            isEdit.value = true
        } else {
            let res = await Service.updateUserInfoUsingPost((form as any));
            if (res.code === 0) {
                ElMessage({
                    message: '编辑成功',
                    type: 'success',
                    plain: true,
                });
                isEdit.value = false;
                userStore.userInfo = res.data;
            } else {
                ElMessage({
                    message: '编辑失败',
                    type: 'error',
                    plain: true,
                });
                updateData();
            }
        }
    }
</script>
<style lang="scss" scoped>
.ai-bank-account-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .account-core-box {
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
        .account-ipt {}
        .account-txt {
            color: #000;
        }
        :deep(.el-card__body) {
            padding: 32px 56px;
            width: 560px;
        }
        .account-btn {
            width: 100%;
            font-size: 14px;
        }
        .account-action {
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