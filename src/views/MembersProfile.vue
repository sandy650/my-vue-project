<template>
  <div class="Profile">
    <h2>登入後畫面</h2> 
   
  </div>
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";


export default {
  name: "membersprofile",
  setup() {
    const router = useRouter(); 
  /*
    const form = ref({});
    const rules = ref({});
    const registerForm = ref(null);
    return {
      form,
      rules,
      registerForm,
    };*/
  },
  
};
</script>

<style scoped>
.Profile {
  max-width: 450px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
.send-code-btn-col {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 10px;
  margin-left: 10px;
}
.phone-row {
  display: flex;
  align-items: center;
}
.phone-row .el-input {
  flex: 1;
}
.phone-row .el-button {
  margin-left: 10px; 
}
.forgot-phone-col .el-button,
.send-code-btn-col .el-button {
  margin-left: 10px; 
}
.el-row {
  margin-bottom: 10px;
}
</style>