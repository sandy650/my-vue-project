<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="1200px">
        <div class="title-bar">
          <img class="logo" src="/src/assets/logo.jpg" alt="logo" />
          <div class="title">e險無憂</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="100px">
        <div class="user-login-status">
          <!-- 判斷是否已登入 -->
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { MenuProps } from "ant-design-vue";
import { useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
import { inject } from "vue";

const router = useRouter();

// 定義 current，初始值為空
const current = ref<string[]>([]);

const isLoggedIn = inject("isLoggedIn");
const username = inject("username");


// 初始化選單項目
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
/* 判斷是否已登入
const isLoggedIn = ref(false);
const username = ref("");*/



// 初始化登入狀態
onMounted(() => {
  const currentPath = router.currentRoute.value.path || "/";
  current.value = [currentPath];

  // 檢查 sessionStorage 是否有登入資訊
  const storedUsername = sessionStorage.getItem("username");
  if (storedUsername) {
    isLoggedIn.value = true;
    username.value = storedUsername;
  }
});

// 點擊選單項目
const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key });
};

// 登出功能
const logout = () => {
  sessionStorage.clear();
  isLoggedIn.value = false;
  username.value = "訪客";
  router.push("/");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 24px;
  margin-left: 16px;
}

.logo {
  height: 40px;
}
</style>
