<template>
    <div class="data-bar-chart" ref="chartDomRef"></div>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import * as echarts from 'echarts/core';
    import { GridComponent } from 'echarts/components';
    import { BarChart } from 'echarts/charts';
    import { CanvasRenderer } from 'echarts/renderers';

    echarts.use([GridComponent, BarChart, CanvasRenderer]);

    const props = defineProps(['chartData'])

    const chartDomRef = ref();
    
    watch(
        () => props.chartData,
        cur => {
            if (cur) {
                console.log(cur)
                initChart();
            }
        },
        {deep: true}
    )

    const initChart = () => {
        let xData: number[] = [];
        let yValue: string[] = [];
        props.chartData.forEach((item: { datePosition: number; amount: string; }) => {
            xData.push(item.datePosition)
            yValue.push(item.amount)
        })

        let option = {
            xAxis: {
                type: 'category',
                data: xData,
                axisLabel: {
                    fontSize: 16 // 设置纵坐标轴字体大小为16
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 16 // 设置纵坐标轴字体大小为16
                }
            },
            color: ['#95d475'],
            series: [
                {
                    data: yValue,
                    type: 'bar'
                }
            ]
        };
        const barChart = echarts.init(chartDomRef.value);
        option && barChart.setOption(option);
    }
    
</script>
<style lang="scss" scoped>
.data-bar-chart {
    width: 100%;
    height: 60%;
}
</style>