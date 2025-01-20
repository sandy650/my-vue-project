<template>
  <header class="global-header">
    <div class="header-left">
      <img class="logo" src="/src/assets/logo.jpg" alt="Logo" />
      <h1 class="title">e險無憂</h1>
    </div>
    <nav class="header-menu">
      <a v-for="item in menuItems" :key="item.key" :href="item.link" class="menu-item">
        {{ item.label }}
      </a>
    </nav>
    <div class="header-right">
      <template v-if="isLoggedIn">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <router-link to="/membersprofile">會員中心</router-link>
              </a-menu-item>
              <a-menu-item key="logout" @click="logout">登出</a-menu-item>
            </a-menu>
          </template>
          <a-button type="text" class="user-dropdown-btn">
           會員中心 <DownOutlined />
          </a-button>
        </a-dropdown>
      </template>
      <template v-else>
        <router-link to="/membersLogin">
          <a-button class="login-btn">登入</a-button>
        </router-link>
      </template>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";

const isLoggedIn = ref(false);
const username = ref("訪客");

const menuItems = [
  { key: "products", label: "網路投保商品", link: "/products" },
  { key: "calculator", label: "快速試算", link: "/calculator" },
  { key: "claims", label: "理賠服務", link: "/claims" },
  { key: "faq", label: "常見問題", link: "/faq" },
  { key: "forum", label: "討論區", link: "/forum" },
];

onMounted(() => {
  const storedUsername = sessionStorage.getItem("username");
  if (storedUsername) {
    isLoggedIn.value = true;
    username.value = storedUsername;
  }
});

const logout = () => {
  sessionStorage.clear();
  isLoggedIn.value = false;
  username.value = "訪客";
};
</script>

<style scoped>
.global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #e9ecef;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 0;
}

.header-menu {
  display: flex;
  gap: 20px;
}

.menu-item {
  text-decoration: none;
  font-size: 16px;
  color: #495057;
  font-weight: 500;
  transition: color 0.3s ease;
}

.menu-item:hover {
  color: #007bff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-dropdown-btn {
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  background: none;
  border: none;
  cursor: pointer;
}

.user-dropdown-btn:hover {
  color: #007bff;
}

.login-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

@media screen and (max-width: 768px) {
  .global-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .menu-item {
    font-size: 14px;
  }

  .header-right {
    justify-content: flex-start;
  }
}
</style>
