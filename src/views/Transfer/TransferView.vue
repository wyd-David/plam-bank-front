<template>
    <section class="ai-bank-transfer-page">
        <el-tabs v-model="currentTab" class="demo-tabs">
            <el-tab-pane label="转账数据" name="data">
                <TransferData />
            </el-tab-pane>
            <el-tab-pane label="实时转账" name="realtime">
                <RealtimeTransfer />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import RealtimeTransfer from './RealtimeTransfer.vue';
    import TransferData from './TransferData.vue';

    const currentTab = ref('data');
</script>
<style lang="scss" scoped>
.ai-bank-transfer-page {

}
</style>