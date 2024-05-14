<template>
    <section class="ai-bank-recharge-page">
        <div class="recharge-core-box">
            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="账户余额">
                    <span>{{ userStore.userInfo.balance }}</span>
                </el-form-item>
                <el-form-item label="充值金额">
                    <el-input v-model="amount" class="recharge-ipt" size="large"></el-input>
                </el-form-item>
            </el-form>
            <div style="margin-left: 68px;">
                <el-button type="success" @click="toPay('WEI_CHAT_PAY')">微信支付</el-button>
                <el-button type="primary" @click="toPay('ALIPAY')">支付宝支付</el-button>
                <el-button type="success" @click="getCash('WEI_CHAT_PAY')">微信提现</el-button>
                <el-button type="primary" @click="getCash('ALIPAY')">支付宝提现</el-button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/user';
    import { Service } from '@/api/services/Service';
    import { ElMessage } from 'element-plus';

    const userStore = useUserStore();

    const amount = ref('');
    const uniqueToken = ref('');

    const toPay = async (channelCode: string) => {
        let tokenRes = await Service.getTradingTokenUsingGet();

        if (tokenRes.code === 0) {
            uniqueToken.value = tokenRes.data as string;
            const params = {
                uniqueToken: uniqueToken.value,
                channelCode,
                amount: amount.value,
            }
            let res = await Service.doRechargeUsingPost(params);
            if (res.code === 0) {
                ElMessage({
                    message: '充值成功！',
                    type: 'success',
                    plain: true,
                });
                userStore.userInfo.balance = res.data.balance;
                amount.value = '0';
            }
        }
    }

    const getCash = async (channelCode: string) => {
        let tokenRes = await Service.getTradingTokenUsingGet();

        if (tokenRes.code === 0) {
            uniqueToken.value = tokenRes.data as string;
            const params = {
                uniqueToken: uniqueToken.value,
                channelCode,
                amount: amount.value,
            }
            let res = await Service.doWithdrawUsingPost(params);
            if (res.code === 0) {
                ElMessage({
                    message: '提现成功！',
                    type: 'success',
                    plain: true,
                });
                userStore.userInfo.balance = res.data.balance;
                amount.value = '0';
            }
        }
    }
</script>
<style lang="scss" scoped>
.ai-bank-recharge-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .recharge-core-box {
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
        :deep(.el-card__body) {
            padding: 32px 56px;
            width: 560px;
        }
        .recharge-btn {
            width: 100%;
            font-size: 14px;
        }
        .recharge-action {
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