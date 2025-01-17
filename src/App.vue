<template>
  <div id="app">
    <Header />
 
    <router-view />
    <Footer />
  </div>
 
</template>

<script setup> 
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>

