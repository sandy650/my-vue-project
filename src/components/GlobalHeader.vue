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
  { key: 'discussionView', label: '討論區', link: '/discussionView' },
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
  background: linear-gradient(to right, #d4edda, #ffffff); /* 淡綠到白色漸層背景 */
  color: #ffffff; /* 白色字體 */
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 陰影強化 */
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px; /* 調整 Logo 大小 */
  margin-right: 1rem;
  border-radius: 5px; /* 圓角設計 */
  border: 3px solid #ffffff; /* 加粗白色邊框 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 為 Logo 添加陰影 */
}

.title {
  font-size: 2.4rem; /* 增大字體 */
  font-weight: bold;
  color: #ffffff; /* 白色字體 */
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3); /* 強化陰影 */
  letter-spacing: 2px; /* 增加字距 */
  font-family: 'Roboto', sans-serif; /* 切換更現代的字體 */
  background: linear-gradient(90deg, #43cea2, #185a9d); /* 漸層字體背景 */
  -webkit-background-clip: text; /* 漸層填充文字 */
  -webkit-text-fill-color: transparent; /* 透明字體 */
}

.header-menu {
  display: flex;
  gap: 2rem; /* 增加間距 */
}

.menu-item {
  text-decoration: none;
  color: #2d572c; /* 深綠色文字，與內容區一致 */
  font-weight: 700; /* 加粗字體 */
  font-size: 1.2rem; /* 增大字體 */
  transition: all 0.3s ease; /* 添加滑鼠懸停效果 */
  text-transform: uppercase; /* 轉為大寫，增加視覺吸引力 */
}

.menu-item:hover {
  color: #155724; /* 懸停變更深綠色 */
  transform: scale(1.1); /* 懸停放大效果 */
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown-btn {
  color: #2d572c; /* 深綠色文字，與內容一致 */
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.user-dropdown-btn:hover {
  color: #155724; /* 懸停變更深綠色 */
  transform: scale(1.05); /* 輕微放大效果 */
}
</style>


