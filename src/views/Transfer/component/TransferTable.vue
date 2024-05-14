<template>
    <el-table :data="props.tradeTableData" style="width: 100%">
        <el-table-column prop="id" label="交易ID" />
        <el-table-column prop="tradeChannelCode" label="交易渠道">
            <template #default="scope">
                {{ channelMap[scope.row.tradeChannelCode] }}
            </template>
        </el-table-column>
        <el-table-column prop="payAccount" label="付款人" />
        <el-table-column prop="payeeAccount" label="收款人" />
        <el-table-column prop="tradeTime" label="交易时间">
            <template #default="scope">
                {{ dayjs(scope.row.tradeTime).format('YYYY-MM-DD hh:mm:ss') }}
            </template>
        </el-table-column>
        <el-table-column prop="tradeType" label="交易分类" />
        <el-table-column prop="remark" label="交易备注" />
    </el-table>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Service } from '@/api/services/Service';
    import dayjs from 'dayjs';

    const props = defineProps<{
        tradeTableData: any[]
    }>()

    interface Channel {
        channelCode: string;
        channelName: string;
    };

    const channelMap = ref<any>({});

    onMounted(() => {
        getChannelData();
    });

    const getChannelData = async () => {
        let res = await Service.getSupportTradeChannelUsingGet();
        if (res.code === 0) {
            (res.data as Channel[]).forEach(item => {
                channelMap.value[item.channelCode] = item.channelName;
            })
        }
    }

</script>
<style lang="scss" scoped>
</style>