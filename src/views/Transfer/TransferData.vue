<template>
    <section class="transfer-data">
        <div class="reconciliation-header">
            <el-button type="success" @click="showReconciliationResult">对账结果</el-button>
            <span class="time">上次对账时间（{{ time + ' 00:00:00' }}）</span>
        </div>
        <div class="search">
            <el-form :inline="true">
                <el-form-item label="交易类型">
                    <el-select
                        v-model="tradeType"
                        placeholder="请选择类型"
                        style="width: 240px"
                        :clearable="true"
                        >
                        <el-option
                            v-for="item in tradeTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        />
                        </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        v-model="timeRange"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTransferData">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <TransferTable :tradeTableData="tradeTableData"></TransferTable>
        </div>
        <el-dialog
            v-model="reconciliationDialogVisible"
            width="40%"
            :before-close="closeDialog"
            :show-close="false"
        >
            <template #title>
                <div class="reconciliation-dialog-header">
                    <div>总收入：{{ totalData.revenue }}</div>
                    <div>总支出：{{ totalData.pay }}</div>
                </div>
            </template>

            <div class="reconciliation-dialog-content">
                <div class="data-detail-item">
                    <PieDataChart :chartData="revenueChartData" />
                    <div style="text-align: center">收入渠道构成</div>
                </div>
                <div class="data-detail-item">
                    <PieDataChart :chartData="payChartData" />
                    <div style="text-align: center">支出渠道构成</div>
                </div>
            </div>
        </el-dialog>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Service } from '@/api/services/Service';
    import dayjs from 'dayjs';
    import PieDataChart from './Chart/PieDataChart.vue';
    import TransferTable from './component/TransferTable.vue';

    interface Channel {
        channelCode: string;
        channelName: string;
    };

    const tradeType = ref('RECHARGE');
    const channelList = ref<Channel[]>([]);
    const channelMap = ref<any>({});
    const time = ref('');
    const reconciliationDialogVisible = ref<boolean>(false);
    const tradeTableData = ref<any[]>([]);
    const timeRange = ref('');
    const tradeTypeList = ref([
        {
            name: '充值',
            value: 'RECHARGE'
        },
        {
            name: '转账',
            value: 'TRADE'
        },
        {
            name: '提现',
            value: 'WITHDRAW'
        },
    ]);
    
    const payChartData = ref({});
    const revenueChartData = ref({});
    const totalData = ref({pay: 0, revenue: 0});

    onMounted(() => {
        getTransferData();
        getChannelData();
        getReconciliationData();
        time.value = dayjs().format('YYYY-MM-DD');
    });

    const getTransferData = async () => {
        let params: any = {
            startTime: timeRange.value.length ? dayjs(timeRange.value[0]).format('YYYY-MM-DD HH:mm:ss') : '',
            endTime: timeRange.value.length ? dayjs(timeRange.value[1]).format('YYYY-MM-DD HH:mm:ss') : '',
            tradeType: tradeType.value
        }
        let res = await Service.getMyTradeRecordsUsingGet(params.endTime, params.startTime, params.tradeType);
        if (res.code === 0) {
            tradeTableData.value = res.data as any[];
        }
    }

    const getChannelData = async () => {
        let res = await Service.getSupportTradeChannelUsingGet();
        if (res.code === 0) {
            channelList.value = (res.data as Channel[]);
            channelList.value.forEach(item => {
                channelMap.value[item.channelCode] = item.channelName;
            })
        }
    }

    const closeDialog = () => {
        reconciliationDialogVisible.value = false;
    }

    const showReconciliationResult = () => {
        reconciliationDialogVisible.value = true;
    }

    const getReconciliationData = async () => {
        let res = await Service.getTradeDataBoardUsingGet();
        if (res.code === 0) {
            payChartData.value = res.data.payList;
            revenueChartData.value = res.data.revenueList;
            res.data.payList.forEach((payItem: any) => {
                totalData.value.pay += Number(payItem.amount)
            })

            res.data.payList.forEach((revenueItem: any) => {
                totalData.value.revenue += Number(revenueItem.amount)
            })
        }
    }
</script>
<style lang="scss" scoped>
.transfer-data {
    .reconciliation-header {
        .time {
            margin-left: 8px;
            color: #999;
            font-weight: 600;
        }
    }
    .search {
        margin-top: 16px
    }

    .reconciliation-dialog-header {
        display: flex;
        justify-content: space-around;
        div {
            font-weight: 600;
            font-size: 16px;
        }
    }
    
    .reconciliation-dialog-content {
        height: 300px;
        display: flex;
        .data-detail-item {
            height: 100%;
            width: 50%;
        }
    }
}
</style>