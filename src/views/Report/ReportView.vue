<template>
    <section class="ai-bank-report-page">
        <el-tabs v-model="currentTab" class="report-tabs">
            <el-tab-pane label="营收" name="income">
                <IncomeData v-if="currentTab === 'income'" />
            </el-tab-pane>
            <el-tab-pane label="支出" name="expenditure">
                <PayData v-if="currentTab === 'expenditure'"  />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import IncomeData from './IncomeData.vue';
    import PayData from './PayData.vue';

    const currentTab = ref('income');
</script>
<style lang="scss" scoped>
.ai-bank-report-page {
    height: 100%;
    width: 100%;
    .report-tabs {
        height: 100%;
        :deep(.el-tabs__content) {
            height: calc(100% - 55px);
            .el-tab-pane {
                height: 100%;
            }
        }
    }
}
</style>