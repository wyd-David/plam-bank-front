<template>
    <section class="ai-bank-search-page">
        <el-tabs v-model="currentTab" class="search-tabs" @tab-change="changeTab">
            <el-tab-pane label="用户" name="user">
                <UserCard v-if="accountList.length" :accountList="accountList"></UserCard>
                <el-card v-else>
                    <div style="text-align: center;">
                        暂无数据
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="社区内容" name="community">
                <FeedList v-if="feedList.length" :feedList="feedList"></FeedList>
                <el-card v-else>
                    <div style="text-align: center;">
                        暂无数据
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="交易记录" name="record">
                <TransferTable :tradeTableData="tradeTableData"></TransferTable>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import router from '@/router';
    import { Service } from '@/api/services/Service';
    import UserCard from '@/views/Transfer/component/UserCard.vue';
    import TransferTable from '@/views/Transfer/component/TransferTable.vue';
    import type { IUserInfo } from '@/stores/types/user.type';
    import FeedList from '@/views/Community/component/FeedList.vue';

    enum TabCode {
        user = 2,
        community = 1,
        record = 3
    }

    const tabCodeMap: any = {
        user: 2,
        community: 1,
        record: 3
    }

    const currentTab = ref('user');

    const accountList = ref<IUserInfo[]>([]);
    const tradeTableData = ref<any[]>([]);
    const feedList = ref<any[]>([]);
    const currentCode = ref(2);

    watch(
        () => router.currentRoute.value.query,
        () => {
            getSearchData(currentCode.value);
        },
        {deep: true}
    )

    onMounted(() => {
        getSearchData();
    })

    const getSearchData = async (searchCode: number = 2) => {
        const keyword: string = router.currentRoute.value.query.keyword as string;
        let res = await Service.searchAllUsingGet(keyword, 1, 10, searchCode)
        if (res.code === 0) {
            if (searchCode === TabCode.user) {
                accountList.value = res.data.result;
            } else if(searchCode === TabCode.record) {
                tradeTableData.value = res.data.result;
            } else if (searchCode === TabCode.community) {
                feedList.value = res.data.result;
            }
        }
    }

    const changeTab = (name: any) => {
        getSearchData(tabCodeMap[name]);
        currentCode.value = tabCodeMap[name];
    }

</script>
<style lang="scss" scoped>
.ai-bank-search-page {
    height: 100%;
    width: 100%;
    .search-tabs {
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