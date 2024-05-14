<template>
    <section class="real-time-transfer">
        <div class="search-transfer-box">
            <el-input v-model="keywords" size="large"></el-input>
            <el-button size="large" type="success">搜索转账</el-button>
        </div>
        <UserCard :accountList="accountList"></UserCard>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Service } from '@/api/services/Service';
    import type { IUserInfo } from '@/stores/types/user.type';
    import UserCard from './component/UserCard.vue';

    const keywords = ref<string>('');
    const accountList = ref<IUserInfo[]>([]);

    onMounted(() => {
        getTransferUser();
    })

    const getTransferUser = async () => {
        let res = await Service.searchUserForTradeUsingGet(keywords.value);
        if (res.code === 0) {
            accountList.value = res.data as IUserInfo[];
        }
    }
</script>
<style lang="scss" scoped>
.real-time-transfer {
    .search-transfer-box {
        display: flex;
        .el-button {
            margin-left: 12px;
        }
    }
}
</style>