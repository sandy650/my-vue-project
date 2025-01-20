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
}

.layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}


.header {
  background: white;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20px;
}


.content {
  flex: 1;
  padding: 20px;
  background: linear-gradient(to right, #efefef, #ffff);
}


.footer {
  background: #efefef;
  text-align: center;
  padding: 20px;
}
</style>
