import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layouts/BasicLayout.vue"; // 引入 Layout

import MembersHome from "@/views/MembersHome.vue";
import MembersLogin from "@/views/MembersLogin.vue";
import MembersForgotPwd1 from "@/views/MembersForgotPwd1.vue";
import MembersProfile from "@/views/MembersProfile.vue";
import MembersRegister from "@/views/MembersRegister.vue";
import MembersTest from "@/views/MembersTest.vue";
import MemberInformation from "../views/MemberInformation.vue";
const routes = [

  {
    path: "/membersLogin", // 相對路徑，拼接為 `/membersLogin`
    name: "MembersLogin",
    component: MembersLogin,
  }, {
    path: "/membersHome", // 相對路徑，拼接為 `/membersHome`
    name: "MembersHome",
    component: MembersHome, // 首頁
  },

  {
    path: "/membersforgotPwd1", // 相對路徑
    name: "MembersForgotPwd1",
    component: MembersForgotPwd1,
  },
  {
    path: "/membersprofile", // 相對路徑
    name: "MembersProfile",
    component: MembersProfile,
  },
  {
    path: "/membersregister", // 相對路徑
    name: "MembersRegister",
    component: MembersRegister,
  },
  {
    path: "/membersTest", // 相對路徑
    name: "MembersTest",
    component: MembersTest,
  },
  {
    path: "/memberInformation", // 相對路徑
    name: "MemberInformation",
    component: MemberInformation,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 改用 createWebHistory
  routes,
});

export default router;
