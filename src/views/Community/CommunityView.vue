<template>
    <section class="ai-bank-community-page">
        <div class="community-main-content">
            <CommunityPublisher @submit="handleSubmit" /> 
            <FeedList :feedList="feedList" />
        </div>
        <HotCommunity />
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import HotCommunity from './component/HotCommunity.vue'
    import FeedList from './component/FeedList.vue';
    import CommunityPublisher from './component/CommunityPublisher.vue';
    import { Service } from '@/api/services/Service';

    const pageNo = ref(1);
    const pageSize = ref(10);
    const feedList = ref<any[]>([])

    onMounted(() => {
        getFeedData();
    });

    const getFeedData = async () => {
        let res = await Service.indexListUsingGet(pageNo.value, pageSize.value);
        if (res.code === 0) {
            feedList.value = res.data?.result || [];
        }
    }

    const handleSubmit = () => {
        pageNo.value = 1;
        getFeedData();
    }
</script>
<style lang="scss" scoped>
.ai-bank-community-page {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .community-main-content {
        flex: 1;
    }
    :deep(.el-card__body) {
        padding: 16px;
    }
}
</style>