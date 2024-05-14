<template>
    <div class="right-hot-community">
        <el-card shadow="never">
            <div class="label">热门社区</div>
            <div class="hot-list">
                <div v-for="(hotItem, index) in hotList" :key="hotItem.id" class="hot-item">{{ index + 1 + '、' + hotItem.title}}</div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { Service } from '@/api/services/Service';

    const hotList = ref<any[]>([]);

    onMounted(() => {
        getHotList();
    });

    const getHotList = async () => {
        let res = await Service.hotListUsingGet();
        if (res.code === 0) {
            hotList.value = res.data?.result || [];
        }
    }
</script>
<style lang="scss" scoped>
.right-hot-community {
    width: 270px;
    margin-left: 24px;
    .label {
        color: rgba(34, 34, 34, 1);
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    .hot-list {
        .hot-item {
            color: rgba(51, 51, 51, 1);
            font-weight: 400;
            padding: 4px 0;
        }
    }
}
</style>