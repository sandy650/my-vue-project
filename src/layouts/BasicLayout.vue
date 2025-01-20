<template>
<div id="basicLayout">

<a-layout>
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>

      <a-layout-content class="context">Content</a-layout-content>
      <router-view/>
      <a-layout-footer class="footer">
      <a href="" target="_blank">聯絡我們
      </a>
      <p>2025 e險無憂投保平台. 保留所有權利。</p>
  </a-layout-footer>
</a-layout>
  </div>
</template>



<script setup lang="ts">

import GlobalHeader from '../components/GlobalHeader.vue';
</script>

<style scoped>
.footer {
  background: #efefef;
  text-align: center;
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  padding: 20px;
 
}
.context{
  padding:20px;
  margin-bottom: 20px;
  background:linear-gradient(to right,#efefef,#ffff) ;
}
.header{
  background: white;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20px;
}

</style>