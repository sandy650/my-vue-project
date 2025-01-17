<template>
  <v-app>
    <!-- 主框架 -->
    <v-layout>
      <!-- 側邊導航欄 -->
      <v-navigation-drawer v-model="drawer" color="primary" disable-resize-watcher>
        <v-list nav>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :active="activeIndex === item.index"
            color="primary"
            @click="navigateTo(item.path, item.index)"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- 頂部導航欄 -->
      <v-app-bar class="px-md-4">
        <template #prepend>

          <v-app-bar-nav-icon
            v-if="$vuetify?.display?.smAndDown"
            @click="drawer = !drawer"
          />
        </template>

        <!-- 頂部 LOGO -->
        <v-img
          class="me-sm-8"
          max-width="40"
          src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
        />

        <!-- 頂部導航按鈕 -->
        <template v-if="$vuetify?.display?.mdAndUp">
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :active="activeIndex === item.index"
            color="primary"
            class="me-2 text-none"
            slim
            @click="navigateTo(item.path, item.index)"
          >
            {{ item.text }}
          </v-btn>
        </template>

        <v-spacer />

        <!-- 頂部右側功能按鈕 -->
        <template #append>
          <v-btn
            class="ms-1"
            color="medium-emphasis"
            icon="mdi-bell-outline"
          />

          <v-btn class="ms-1" icon>
            <v-avatar image="https://cdn.vuetifyjs.com/images/john.png" />

            <v-menu activator="parent" origin="top">
  <v-list>
    <v-list-item link title="更新個人資料" />
    <v-list-item link @click="logout" title="登出" />
  </v-list>
</v-menu>
          </v-btn>
        </template>
      </v-app-bar>

      <!-- 主內容區域 -->
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const drawer = ref(false);
const activeIndex = ref("1");
const router = useRouter();
const isLoggedIn = ref(false);

const items = ref([
  { text: "首頁", path: "/", index: "1" },
  { text: "產品介紹", path: "/products", index: "2" },
  { text: "保單管理", path: "/policy", index: "3" },
  { text: "聯絡我們", path: "/contact", index: "4" },
 // { text: "會員專區", path: "/MembersLogin", index: "5" },
  { text: "測試", path: "/MembersTest", index: "6" },
]);

// 檢查登入狀態
function checkLoginStatus() {
  const userId = sessionStorage.getItem("userId");
  isLoggedIn.value = !!userId; // 判斷是否登入
  updateMenuItems();
}

// 動態更新選單
function updateMenuItems() {
  if (isLoggedIn.value) {
    items.value.push({ text: "登出", path: "/logout", index: "6" });
  } else {
    items.value.push({ text: "會員專區", path: "/MembersLogin", index: "5" });
  }
}

// 登出邏輯
async function logout() {
  try {
    await axios.post("http://localhost:8081/logout");
    sessionStorage.clear(); // 清除登入資訊
    isLoggedIn.value = false;
    router.push("/MembersLogin");
  } catch (error) {
    console.error("登出失敗", error);
    alert("登出失敗，請稍後再試！");
  }
}

// 導航
function navigateTo(path, index) {
  if (router.currentRoute.value.path !== path) {
    activeIndex.value = index;
    router.push(path);
  }
}

// 組件初始化
checkLoginStatus();
</script>

<style scoped>

</style>
