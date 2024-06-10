<template>
    <el-container class="ai-bank-layout">
        <el-header class="ai-bank-header">
            <div class="logo-label">AI 云账户系统</div>
            <div style="flex: 1;">
                <el-menu
                    v-if="userStore.userInfo.nickname"
                    mode="horizontal"
                    class="ai-bank-header-menu"
                    background-color="#24292f"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true"
                    :default-active="headerActive"
                >
                    <el-menu-item index="community">移动生活社区</el-menu-item>
                    <el-menu-item index="transfer">转账系统</el-menu-item>
                    <el-menu-item index="report">报表系统</el-menu-item>
                    <el-menu-item index="project">项目平台</el-menu-item>
                </el-menu>
            </div>
            <el-input
                class="header-search-ipt"
                placeholder="搜一搜"
                :suffix-icon="Search"
                @keydown.enter="handleSearch"
                v-model="keyword"
            />
            
            <el-dropdown class="header-account-dropdown" popper-class="header-dropdown-popper">
                <div class="header-account-info">
                    <el-avatar :src="userStore.userInfo.logo" />
                    <span v-if="userStore.userInfo.nickname" class="name" @click="toAccount">{{ userStore.userInfo.nickname }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside v-if="isAccount" width="200px">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="ai-bank-aside-menu"
                    text-color="#fff"
                    :router="true"
                    :default-active="asideActive"
                    >
                    <el-menu-item :route="{ path: '/account' }" index="account">
                        <span>个人资料</span>
                    </el-menu-item>
                    <el-menu-item :route="{ path: '/recharge' }" index="recharge">
                        <span>银行账户充值</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="ai-bank-main-content">
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
    import { computed, onMounted, watch, ref, nextTick } from 'vue';
    import { RouterView } from 'vue-router';
    import router from '@/router';
    import { Search, UserFilled } from '@element-plus/icons-vue';
    import { useUserStore } from '@/stores/user';

    const userStore = useUserStore();
    const headerActive = ref('');
    const asideActive = ref('');
    const keyword = ref('');

    watch(
        () => router.currentRoute.value,
        cur => {
            if (cur.meta.aside) {
                headerActive.value = '';
                switch (cur.name) {
                    case 'Account':
                        asideActive.value = 'account'
                        break;
                    case 'Recharge':
                        asideActive.value = 'recharge'
                        break;
                    default:
                        asideActive.value = ''
                        break;
                }
            } else {
                switch (cur.name) {
                    case 'Transfer':
                        headerActive.value = 'transfer'
                        break;
                    case 'Report':
                        headerActive.value = 'report'
                        break;
                    case 'Community':
                        headerActive.value = 'community'
                        break;
                    default:
                        headerActive.value = ''
                        break;
                }
            }
        },
        {deep: true, immediate: true}
    )
    
    onMounted(() => {
        userStore.getUserData();
        setTimeout(() => {
            if (router.currentRoute.value.query.keyword) {
                keyword.value = router.currentRoute.value.query.keyword as string;
            }
        })
    })

    const isAccount = computed(() => {
        if (router.currentRoute.value.meta.aside) {
            return true;
        } else {
            return false;
        }
    });

    const toAccount = () => {
        router.push({
            path: '/account'
        })
    }

    const logOut = () => {
        userStore.logOut();
    }

    const handleSearch = () => {
        router.push({
            path: '/search',
            query: {
                keyword: keyword.value
            }
        })
    }
</script>

<style lang="scss">
.ai-bank-layout {
    background-color: rgba(247, 248, 249, 1);
    .ai-bank-header {
        background-color: #24292f;
        display: flex;
        align-items: center;
        .logo-label {
            color: #fff;
            font-size: 24px;
            font-weight: 600;
        }
        .header-account-info {
            display: flex;
            align-items: center;
            color: #fff;
            cursor: pointer;
            .name{
                margin-left: 8px;
            }
        }
        .header-account-dropdown {
            .header-account-info:focus-visible {
                outline: unset;
            }
        }
    }
    .ai-bank-header-menu {
        flex: 1;
        margin-left: 32px;
        border: none !important;
    }
    .ai-bank-aside-menu {
        height: 100%;
    }
    .header-search-ipt {
        width: 240px;
        margin-right: 20px;
    }

    .ai-bank-main-content {
        max-width: 1200px;
        margin: auto;
    }
}
.header-dropdown-popper {
    width: 100px;
}
</style>
<style lang="scss">
.search-popover-search {
    padding: 16px !important;
}
.header-search-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .guess-search,.hot-search {
        width: calc(50% - 10px);
        .label {
            font-weight: 600;
            color: #333;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .search-list {
            .search-item {
                padding: 4px 0;
            }
        }
    }
}
</style>