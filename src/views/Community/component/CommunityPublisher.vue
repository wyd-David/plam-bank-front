<template>
    <el-card shadow="never">
        <div class="community-publisher">
            <el-input v-model="title" class="title" placeholder="标题"></el-input>

            <el-input
                v-model="content"
                class="content"
                placeholder="内容"
                type="textarea"
                resize="none"
                rows="4"
            ></el-input>
        </div>
        
        <div class="bottom-action">
            <div>
                <span>#话题</span>
                <span>#打卡</span>
            </div>
            <el-button type="primary" @click="submit">发布</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Service } from '@/api/services/Service';
    import { ElMessage } from 'element-plus';

    const emit = defineEmits(['submit']);
    const title = ref('');
    const content = ref('');

    const submit = async () => {
        let params = {
            title: title.value,
            content: content.value,
            richContent: content.value,
        }

        let res = await Service.createOneUsingPost(params);
        if (res.code === 0) {
            ElMessage({
                message: '发布成功',
                type: 'success',
                plain: true,
            });
            emit('submit');
            title.value = '';
            content.value = '';
        }
    }
</script>
<style lang="scss" scoped>
.el-card {
    border: none;
    .community-publisher {
        background-color: rgba(248, 248, 248, 1);
        padding: 4px;
        margin-bottom: 8px;
        border-radius: 4px;
        .title {
            :deep(.el-input__wrapper) {
                box-shadow: none;
                border-bottom: 1px solid rgba(240,240,240,1);
                background-color: transparent;
            }
            
        }
        .content {
            :deep(.el-textarea__inner) {
                box-shadow: none;
                background-color: transparent;
            }
        }
    }
    .bottom-action {
        display: flex;
        justify-content: space-between;
    }
}
</style>