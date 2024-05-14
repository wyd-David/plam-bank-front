<template>
    <div class="transfer-account-list">
        <el-card v-for="(account, index) in props.accountList" :key="index" class="transfer-account-item">
            <div class="user">
                <el-avatar :src="account.logo" :size="50" />
                <div class="name">
                    {{ account.nickname+'|' }}
                    {{ account.schoolName ? account.schoolName+'|' : '' }}
                    {{ account.id ? '用户ID'+account.id : '' }}
                </div>
            </div>
            <el-button type="primary" size="large" @click="payToUser(account)">转账</el-button>
        </el-card>
    </div>
    <el-dialog
        v-model="payDialogVisible"
        width="500"
        :before-close="closeDialog"
        center
        :show-close="false"
    >
        <template #title>
            <el-avatar :src="userStore.userInfo.logo" :size="50" />
            <div class="name">用户信息</div>
        </template>

        <div class="transfer-dialog-content">
            <div class="balance-txt">
                我的账户余额：{{ userStore.userInfo.balance }}
            </div>
            <el-input v-model="transferData.amount" class="transfer-input" placeholder="请输入金额"></el-input>
            <el-input v-model="transferData.remark" class="transfer-input" placeholder="请输入备注"></el-input>
        </div>
        
        <template #footer>
            <div class="dialog-footer">
                <el-button type="success" @click="confirmPay">确认转账</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { Service } from '@/api/services/Service';
    import { useUserStore } from '@/stores/user';
    import type { IUserInfo } from '@/stores/types/user.type';
    import { ElMessage } from 'element-plus';

    const userStore = useUserStore();
    const props = defineProps<{
        accountList: IUserInfo[]
    }>();

    const payDialogVisible = ref<boolean>(false);

    const transferData = reactive({
        amount: '',
        payAccount: '',
        payeeAccount: '',
        payeeUserId: '',
        remark: '',
        tradeChannelCode: 'PALM_BANK_PAY',
        uniqueToken: '',
    })

    const confirmPay = async () => {
        let res = await Service.doTradingUsingPost(transferData as any);
        if (res.code === 0) {
            ElMessage({
                message: '转账成功',
                type: 'success',
                plain: true,
            });
            payDialogVisible.value = false;
        }
    }

    const payToUser = async (account: any) => {
        let res = await Service.getTradingTokenUsingGet();
        if (res.code === 0) {
            transferData.uniqueToken = res.data || '';
            payDialogVisible.value = true;
            transferData.payeeAccount = account.cardId;
            transferData.payeeUserId = account.id;
            transferData.payAccount = userStore.userInfo.cardId || '';
        }
    }

    const closeDialog = () => {
        payDialogVisible.value = false;
    }
</script>
<style lang="scss" scoped>
.transfer-account-list {
    margin-top: 24px;
    .transfer-account-item {
        padding: 12px 24px;
        margin-bottom: 4px;
        :deep(.el-card__body) {
            padding: 0;
            display: flex;
            justify-content: space-between;
            .user {
                display: flex;
                align-items: center;
                .name {
                    margin-left: 20px
                }
            }
        }
    }
}
.transfer-dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .balance-txt {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
    }
    .transfer-input {
        width: 200px;
        margin-bottom: 8px;
    }
}
</style>