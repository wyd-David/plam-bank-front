<template>
    <section class="ai-bank-sse-page">
        <div class="communicate-content-box">
            <div v-for="(communicate, index) in communicateList" :key="index" :class="`communicate-item ${communicate.type === 'user' ? 'my-question' : ''}`">
                <div></div>
                <div :class="`communicate-content`" v-html="communicate.mdMessage || communicate.message"></div>
                <div></div>
            </div>
        </div>
        <div class="communicate-publisher">
            <el-input v-model="question" size="large" style="width: 100%" @keydown.enter="sendMsg">
                <template #suffix>
                    <el-button style="margin-right: 12px;" type="primary" @click="sendMsg">
                        发送
                        <el-icon><Top /></el-icon>
                    </el-button>
                </template>
            </el-input>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref, onUnmounted } from 'vue';
    import { Top } from '@element-plus/icons-vue';
    import { AiService } from '@/api/services/AiService';
    // @ts-ignore
    import mkKatex from 'markdown-it-katex'; 
    import MarkdownIt from 'markdown-it';

    const eventSourceRef = ref<any>();
    const communicateList = ref<any[]>([]);
    const question = ref<string>('');

    onMounted(() => {
        initSseEvent();
        communicateList.value.push({
            type: 'ai',
            message: '您好，我是银行AI对话助手，有问题可以问我哦~',
            mdMessage: ''
        })
    });

    onUnmounted(() => {
        eventSourceRef.value.close();
    })

    const initSseEvent = () => {

        //  建立SSE连接
        eventSourceRef.value = new EventSource('/palm/bank/ai/conversation/connect', { withCredentials: true});

        // 开启
        eventSourceRef.value.onopen = (event: any) => {
            console.log('连接成功')
        }
                
        // 更新
        eventSourceRef.value.onmessage = (event: any) => {
            const { data } = event;
            if (data === '[DONE]') {
                return;
            }
            const dataJson = JSON.parse(data);
            const contentDetail = dataJson.choices[0];
            if (!contentDetail.finish_reason) {
                communicateList.value[communicateList.value.length - 1].message += contentDetail.delta.content;
                communicateList.value[communicateList.value.length - 1].mdMessage = markdownToHtml(communicateList.value[communicateList.value.length - 1].message)
            }
        };

        // 关闭
        eventSourceRef.value.onclose = (event: any) => {
            console.log('close');
        };

        // 错误
        eventSourceRef.value.onerror = (event: any) => {
            console.log('error');
        };
    }

    const sendMsg = async () => {
        const msg = [{
            content: question.value,
            role: 'user'
        }]
        communicateList.value.push({
            type: 'user',
            message: question.value
        })
        let res = await AiService.sendMessageUsingPost(msg);
        if (res.code === 0) {
            question.value = '';
            communicateList.value.push({
                type: 'ai',
                message: '',
                mdMessage: ''
            });
        }
    }

    const markdownToHtml = (content: string) => {
        const md = new MarkdownIt();
        md.use(mkKatex);
        let result = md.render(content);
        return result;
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
        max-height: calc(100% - 60px);
        overflow: auto;
        .communicate-item {
            display: flex;
            margin-bottom: 8px;
            .communicate-content {
                max-width: calc(100% - 150px);
                padding: 10px 16px;
                background-color: rgb(247, 247, 247);
                border-radius: 8px;
                color: #1A202C;
                strong {
                    font-weight: bold;
                }
                li::marker {
                    line-height: 18px;
                }
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
<style lang="scss">
.communicate-item {
    .communicate-content {
        p {
            margin-bottom: 10px
        }
        strong {
            font-weight: bold;
        }
        ol {
            margin: 8px 0;
            li {
                margin-bottom: 4px
            }
        }
        pre > code {
            white-space: pre-wrap;
        }
    }
}
</style>
