<template>
    <section class="report-income">
        <div style="width: 50%;height: 100%;color: #303133;">
            每日对比
            <BarChart :chart-data="dateList"/>
        </div>
        <div style="width: 50%;height: 100%;color: #303133;">
            每月对比
            <BarChart :chart-data="monthList"/>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import BarChart from './Chart/BarChart.vue';
    import { Service } from '@/api/services/Service';

    const dateList = ref<any[]>([]);
    const monthList = ref<any[]>([]);

    onMounted(() => {
        getChartData();
    });

    const getChartData = async () => {
        let res = await Service.getTradeDataBoardUsingGet1(1);
        if (res.code === 0) {
            dateList.value = res.data.dateList;
            monthList.value = res.data.monthList;
        }
    }

</script>
<style lang="scss" scoped>
.report-income {
    height: 100%;
    display: flex;
    align-items: center;
    .chart-box {
        width: 50%;
        height: 100%;
        color: #303133;
    }
}
</style>