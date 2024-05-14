<template>
    <div class="community-feed-list">
        <div v-for="feedItem in props.feedList" :key="feedItem.id" class="feed-item">
            <div class="feed-title">{{ feedItem.title }}</div>
            <div class="feed-content">{{ feedItem.content }}</div>
            <div class="feed-action">
                <div class="action-btns">
                    <span class="btn-item">
                        <el-icon><Star /></el-icon>
                        <span class="btn-text">{{ feedItem.collectCnt }}</span>
                    </span>
                    <span class="btn-item">
                        <el-icon><IconLike /></el-icon>
                        <span class="btn-text">{{ feedItem.zanCnt }}</span>
                    </span>
                    <span class="btn-item">
                        <el-icon><ChatDotRound /></el-icon>
                        <span class="btn-text">{{ 0 }}</span>
                    </span>
                </div>
                <div class="browse-data">
                    <el-icon><View /></el-icon>
                    <span class="browse-txt">{{ feedItem.viewCnt }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import IconLike from './IconLike.vue';

    const props = defineProps<{feedList: any[]}>();
</script>
<style lang="scss" scoped>
.community-feed-list {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 12px;
    .feed-item {
        padding: 16px;
        border-radius: 4px;
        .feed-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
            color: rgba(51,51,51,1);
        }
        .feed-content {
            font-size: 14px;
            font-weight: 400;
            color: #2f3338;
            margin-bottom: 4px;
        }
        .feed-action {
            display: flex;
            justify-content: space-between;
            .action-btns {
                display: flex;
                .btn-item {
                    color: rgba(153,153,153,1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .btn-text {
                        margin-left: 4px
                    }
                }
                .btn-item + .btn-item {
                    margin-left: 12px;
                }
            }
            .browse-data {
                display: flex;
                justify-content: center;
                color: rgba(153,153,153,1);
                align-items: center;
                .browse-txt {
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>