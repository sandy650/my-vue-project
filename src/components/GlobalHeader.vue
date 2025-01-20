<template>
  <header class="global-header">
    <div class="header-left">
      <img class="logo" src="@/assets/logo.jpg" alt="Logo" />
      <h1 class="title">e險無憂</h1>
    </div>
    <nav class="header-menu">
      <router-link 
        v-for="item in menuItems" 
        :key="item.key" 
        :to="item.link" 
        class="menu-item"
      >
        {{ item.label }}
      </router-link>
    </nav>
    <div class="header-right">
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <template v-if="!isLoggedIn">
              <a-menu-item key="login">
                <router-link to="/membersLogin">登入</router-link>
              </a-menu-item>
            </template>
            <template v-else>
              <a-menu-item key="profile">
                <router-link to="/membersprofile">會員中心</router-link>
              </a-menu-item>
              <a-menu-item key="logout" @click="handleLogout">登出</a-menu-item>
            </template>
          </a-menu>
        </template>
        <a-button type="text" class="user-dropdown-btn">
          會員中心 <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </header>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/userStore.js';

const router = useRouter();
const userStore = useUserStore();

const menuItems = [
  { key: 'products', label: '網路投保商品', link: '/products' },
  { key: 'calculator', label: '快速試算', link: '/calculator' },
  { key: 'claims', label: '理賠服務', link: '/claims' },
  { key: 'bouns', label: '紅利商城', link: '/bouns' },
  { key: 'faq', label: '常見問題', link: '/faq' },
  { key: 'forum', label: '討論區', link: '/forum' },
];

// 即時監聽登入狀態
const isLoggedIn = computed(() => userStore.isLoggedIn);

onMounted(() => {
  userStore.checkLogin(); // 初始化檢查登入狀態
});

const handleLogout = () => {
  userStore.logout();
  router.push('/'); // 登出後返回首頁
};
</script>

<style scoped>
.global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 1rem;
}

.header-menu {
  display: flex;
  gap: 1rem;
}

.menu-item {
  text-decoration: none;
  color: inherit;
}

.header-right {
  display: flex;
  align-items: center;
}
</style>