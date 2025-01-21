<template>
  <div id="basicLayout">
    <a-layout class="layout">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>

      <a-layout-content class="content">
        <router-view/>
      </a-layout-content>

      <a-layout-footer class="footer">
        <a href="" target="_blank">聯絡我們</a>
        <p>2025 e險無憂投保平台. 保留所有權利。</p>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '../components/GlobalHeader.vue';
</script>

<style scoped>
#basicLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif; /* 更現代的字體 */
}

.layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}



.content {
  flex: 1;
  padding: 20px;
  background: linear-gradient(to right, #d4edda, #ffffff); /* 淡綠到白色漸層背景 */
  border-radius: 8px; /* 為內容區域添加圓角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加陰影效果 */
}

.footer {
  background: #2d572c; /* 深綠色背景 */
  color: #ffffff; /* 白色文字 */
  text-align: center;
  padding: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.footer a {
  color: #a8e6cf; /* 淡綠色連結 */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #ffffff; /* 懸停時轉為白色 */
}

.footer p {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 0.85rem;
  opacity: 0.8; /* 提升次要文字的可讀性 */
}
</style>
