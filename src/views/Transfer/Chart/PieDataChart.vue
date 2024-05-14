<template>
    <div class="data-pie-chart" ref="chartDomRef"></div>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import * as echarts from 'echarts/core';
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent
    } from 'echarts/components';
    import { PieChart } from 'echarts/charts';
    import { LabelLayout } from 'echarts/features';
    import { CanvasRenderer } from 'echarts/renderers';

    const props = defineProps(['chartData']);

    echarts.use([
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        PieChart,
        CanvasRenderer,
        LabelLayout
    ]);

    const chartDomRef = ref();

    watch(
        () => props.chartData,
        cur => {
            if (cur) {
                initChart();
            }
        },
        {deep: true}
    )

    onMounted(() => {
        setTimeout(() => {
            initChart();
        }, 100)
    });

    const initChart = () => {
        const valueData = props.chartData.map((item: any) => {
            return {
                name: item.tradeChannelName,
                value: item.amount,
            }
        })

        let option = {
            tooltip: {
                trigger: 'item',
                show: false
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                show: false
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: valueData,
                    labelLine: {
                        show: false
                    },
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        const pieChart = echarts.init(chartDomRef.value);
        option && pieChart.setOption(option);
    }
    
</script>
<style lang="scss" scoped>
.data-pie-chart {
    width: 100%;
    height: 100%;
}
</style>