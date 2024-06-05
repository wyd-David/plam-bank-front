<template>
    <section class="ai-bank-sse-page">
        <div class="communicate-content-box">
            <div class="communicate-item">
                <div></div>
                <div class="communicate-content">
                    对话内容
                </div>
                <div></div>
            </div>
            <div class="communicate-item my-question">
                <div></div>
                <div class="communicate-content">
                    提问
                </div>
                <div></div>
            </div>
        </div>
        <div class="communicate-publisher">
            <el-input size="large" style="width: 100%">
                <template #suffix>
                    <el-button style="margin-right: 12px;" type="primary">
                        发送
                        <el-icon><Top /></el-icon>
                    </el-button>
                </template>
            </el-input>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Top } from '@element-plus/icons-vue';
    import { fetchEventSource } from "@microsoft/fetch-event-source";

    const eventSourceRef = ref<any>();

    onMounted(() => {
        initSseEvent();
    })

    const initSseEvent = () => {
        const url = 'http://47.96.145.135:8080/palm/bank/ai/conversation/connect';

        fetchEventSource(
            url,
            {
                
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
                onmessage(event: any) {
                    let data: any;
                    try {
                        data = JSON.parse(event.data);
                    } catch {
                        console.error("onmessage error");
                    }
                },
                onerror(error) {
                    console.log(error);
                },
                async onopen(response) {
                    console.log(response, 'response')
                }
            }
        )
    }

</script>
<style lang="scss" scoped>
.ai-bank-sse-page {
    height: 100%;
    width: 100%;
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    position: relative;
    .communicate-content-box {
        width: 856px;
        margin: auto;
        max-width: calc(100% - 48px);
        .communicate-item {
            display: flex;
            margin-bottom: 8px;
            .communicate-content {
                max-width: calc(100% - 150px);
                padding: 10px 16px;
                background-color: rgb(247, 247, 247);
                border-radius: 8px;
                color: #1A202C;
            }
        }
        .my-question {
            justify-content: end;
            .communicate-content {
                background-color: #C5D7FF;
            }
        }
    }
    .communicate-publisher {
        text-align: center;
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        width: 768px;
        max-width: calc(100% - 92px);
        :deep(.el-input--large .el-input__wrapper) {
            padding: 10px 15px;
            border-radius: 12px;
        }
    }
}
</style>