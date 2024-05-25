<template>
    <section class="ai-bank-sse-page">
        123213
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    const eventSourceRef = ref<any>();

    onMounted(() => {
    })

    const initSseEvent = () => {
        //  建立SSE连接
        eventSourceRef.value = new EventSource('');

        // 关闭连接  eventSourceRef.value.close();

        // 开启
        eventSourceRef.value.onopen = (ev) => {
            console.log(ev)
        }
                
        // 更新
        eventSourceRef.value.onmessage = (ev) => {
            console.log(ev);
        };

        // 关闭
        eventSourceRef.value.onclose = (ev) => {
            console.log(ev);
        };
        
        // 错误
        eventSourceRef.value.onerror = (ev) => {
            console.log(ev);
        };
    }

</script>
<style lang="scss" scoped>
.ai-bank-sse-page {
    height: 100%;
    width: 100%;
}
</style>