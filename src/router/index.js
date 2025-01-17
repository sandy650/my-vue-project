import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layouts/Layout.vue"; // 引入 Layout
import MembersHome from "@/views/MembersHome.vue";
import MembersLogin from "@/views/MembersLogin.vue";
import MembersForgotPwd1 from "@/views/MembersForgotPwd1.vue";
import MembersProfile from "@/views/MembersProfile.vue";
import MembersRegister from "@/views/MembersRegister.vue";
import MembersTest from "@/views/MembersTest.vue";

const routes = [
  {
    path: "/",
    component: Layout, // Layout 作為主框架
    children: [
      {
        path: "",
        name: "MembersHome",
        component: MembersHome, // 首頁
      },
      {
        path: "membersLogin",
        name: "MembersLogin",
        component: MembersLogin,
      },
      {
        path: "membersforgotPwd1",
        name: "MembersForgotPwd1",
        component: MembersForgotPwd1,
      },
      {
        path: "membersprofile",
        name: "MembersProfile",
        component: MembersProfile,
      },
      {
        path: "membersregister",
        name: "MembersRegister",
        component: MembersRegister,
      },
      {
        path: "membersTest",
        name: "MembersTest",
        component: MembersTest,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
