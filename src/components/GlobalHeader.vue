<template>
  <a-row :wrap="false" class="header-container">
    <!-- 標題 -->
    <a-col flex="300px">
      <div class="title-bar">
        <img class="logo" src="/src/assets/logo.jpg" alt="logo" />
        <div class="title">e險無憂</div>
      </div>
    </a-col>

    <!-- 功能選單 -->
    <a-col flex="auto">
      <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        :items="items"
        @click="doMenuClick"
        class="menu"
      />
    </a-col>

    <!-- 登入狀態 -->
    <a-col flex="150px">
      <div class="user-login-status">
        <template v-if="isLoggedIn">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <router-link to="/membersprofile">會員中心</router-link>
                </a-menu-item>
                <a-menu-item key="logout" @click="logout">
                  登出
                </a-menu-item>
              </a-menu>
            </template>
            <a-button type="text">
              {{ username }} <DownOutlined />
            </a-button>
          </a-dropdown>
        </template>
        <template v-else>
          <router-link to="membersLogin">
            <a-button type="text">登入</a-button>
          </router-link>
        </template>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { MenuProps } from "ant-design-vue";
import { useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
import { inject } from "vue";

const router = useRouter();
const current = ref<string[]>([]);
const isLoggedIn = inject("isLoggedIn");
const username = inject("username");

const items = ref<MenuProps["items"]>([
  {
    key: "/投保商品",
    label: "網路投保商品",
    title: "網路投保商品",
  },
  {
    key: "/快速試算",
    label: "快速試算",
    title: "快速試算",
  },
  {
    key: "/理賠",
    label: "理賠服務",
    title: "理賠服務",
  },
  {
    key: "/常見問題",
    label: "常見問題",
    title: "常見問題",
  },
  {
    key: "/討論區",
    label: "討論區",
    title: "討論區",
  },
]);

onMounted(() => {
  const currentPath = router.currentRoute.value.path || "/";
  current.value = [currentPath];

  const storedUsername = sessionStorage.getItem("username");
  if (storedUsername) {
    isLoggedIn.value = true;
    username.value = storedUsername;
  }
});

const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key });
};

const logout = () => {
  sessionStorage.clear();
  isLoggedIn.value = false;
  username.value = "訪客";
  router.push("/");
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
}

.title {
  margin-left: 12px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.menu {
  display: flex;
  justify-content: center;
}

.user-login-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ant-menu-horizontal {
  flex-wrap: wrap; 
}

.ant-menu-item {
  min-width: 80px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .menu {
    font-size: 12px;
  }

  .title-bar {
    justify-content: center;
  }

  .user-login-status {
    justify-content: center;
  }
}
</style>
