<template>
    <v-app>
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
  
          <v-img
            class="me-sm-8"
            max-width="40"
            src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
          />
  
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
  
          <template #append>
            <v-btn
              class="ms-1"
              color="medium-emphasis"
              icon="mdi-bell-outline"
            />
  
            <!-- 登入後顯示用戶按鈕 -->
            <v-btn v-if="isLoggedIn" class="ms-1" icon>
              <v-avatar image="https://cdn.vuetifyjs.com/images/john.png" />
  
              <v-menu activator="parent" origin="top">
                <v-list>
                  <v-list-item link title="更新個人資料" />
                  <v-list-item link title="登出" @click="logout" />
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
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const drawer = ref(false);
  const activeIndex = ref("1");
  
  const router = useRouter();
  
  // 模擬登入狀態，默認為未登入
  const isLoggedIn = ref(false);
  
  // 導航項目
  const items = [
    { text: "首頁", path: "/", index: "1" },
    { text: "產品介紹", path: "/products", index: "2" },
    { text: "保單管理", path: "/policy", index: "3" },
    { text: "聯絡我們", path: "/contact", index: "4" },
    { text: "會員專區", path: "/MembersLogin", index: "5" },
    { text: "測試", path: "/MembersTest", index: "6" },
  ];
  
  // 導航切換函數
  function navigateTo(path, index) {
    if (router.currentRoute.value.path !== path) {
      activeIndex.value = index;
      router.push(path);
    }
  }
  
  // 模擬登入函數
  function login() {
    isLoggedIn.value = true; // 設置為已登入
  }
  
  // 登出函數
  function logout() {
    isLoggedIn.value = false; // 設置為未登入
    router.push("/membersLogin"); // 返回登入頁
  }
  </script>
  
  <style scoped>

  </style>
  