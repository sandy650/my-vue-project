<template>
  <div id="element-plus">
  <div class="MemberLogin">
    <h2>會員登入</h2>
    <el-form :model="form" :rules="rules" ref="memberLoginForm" label-width="100px">
      <!-- 身分證字號欄位 -->
      <el-form-item label="身分證字號" prop="idNumber">
        <el-row>
          <el-col :span="24">
            <el-input 
  v-model="form.idNumber" 
  placeholder="格式:A123456789" 
  maxlength="10" 
  minlength="10" 
 
  @blur="convertToUppercase('idNumber')">
</el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 密碼欄位 -->
      <el-form-item label="密碼" prop="password">
        <el-row>
          <el-col :span="18">
            <el-input v-model="form.password" type="password" placeholder="請輸入密碼"></el-input>
          </el-col>
          <el-col :span="6" class="forgot-password-col">
            <el-button @click="goToForgotPwd" type="text" >忘記密碼?</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 驗證碼欄位 -->
       <!-- Google reCAPTCHA -->
       <el-form-item label="驗證碼">
        <vue-recaptcha
          :sitekey="v2Sitekey"
          size="normal"
          theme="light"
          hl="zh-TW"
          @verify="recaptchaVerified"
          @expire="recaptchaExpired"
          @fail="recaptchaFailed"
          ref="vueRecaptcha">
        </vue-recaptcha>
      </el-form-item>
      <!-- 登入按鈕 -->
      <el-row class="custom-row">
  <!-- 登入按鈕 -->
  <el-col :span="4" class="login-section">
    <el-button type="primary" @click="submitForm">登入</el-button>
  </el-col>

  <!-- 還不是會員嗎？立即註冊 -->
  <el-col :span="10" class="register-section">
    <span class="not-member-text">還不是會員嗎？</span>
    <el-button @click="goToRegister" type="text">立即註冊</el-button>
  </el-col>
</el-row>
</el-form>
  </div>
</div>
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import vueRecaptcha from 'vue3-recaptcha2';//驗證碼(1)
import axios from "axios";

export default {
  name: "MembersLogin",
  setup() {
    const router = useRouter();
    const form = ref({
      idNumber: "",
      password: "",
      recaptchaToken: "", // 存 reCAPTCHA token
    });

    const v2Sitekey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // 測試用 siteKey

    const rules = ref({
      idNumber: [{ required: true, message: "請輸入身分證字號", trigger: "blur" },
      {
          pattern: /^[A-Z][12]\d{8}$/,
          message: "身分證字號格式不正確",
          trigger: "blur",
        },
      ]
      ,
      password: [{ required: true, message: "請輸入密碼", trigger: "blur" },{
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,16}$/,
          message: "密碼為大小寫字母、數字及特殊符號組成8-16位",
          trigger: "blur",
        },],
    });

    const memberLoginForm = ref(null);

    const recaptchaVerified = (token) => {
      form.value.recaptchaToken = token; // 獲取 reCAPTCHA Token
      console.log("reCAPTCHA 驗證成功:", token);
    };

    const recaptchaExpired = () => {
      form.value.recaptchaToken = "";
      console.log("reCAPTCHA 驗證已過期");
    };

    const recaptchaFailed = () => {
      console.log("reCAPTCHA 驗證失敗");
    };

    const submitForm = () => {
      // if (!form.value.recaptchaToken) {
      //   ElMessage.error("請完成 reCAPTCHA 驗證");
      //   return;
      // }
// "
// http://localhost:8080/insuranceSpring/login"
      memberLoginForm.value.validate(async (valid) => {
        if (valid) {
          try {
            const response = await axios.post(
              "http://localhost:8081/membersLogin",
           
              form.value
            );
            if (response.data.success) {
              sessionStorage.setItem("userId", response.data.data.userId);
              sessionStorage.setItem("sessionId", response.data.data.sessionId);
              Swal.fire({
              title: "登入成功",
            text: "將跳轉登入頁面",
            icon: "success",
            confirmButtonText: "確定",
          }).then(() => {
            // SweetAlert 點擊確定後跳轉至登入頁面
            router.push("/membersprofile");
          });
              
            } else {
              Swal.fire({
            title: "登入失敗",
            text: "請稍後再試",
            icon: "error",
            confirmButtonText: "好",
          });
              ElMessage.error(response.data.message);
            }
          } catch (error) {
            Swal.fire({
            title: "登入失敗",
            text: "請稍後再試",
            icon: "error",
            confirmButtonText: "好",
   
          });
  
            console.error(error);
          }
        } 
      });
    };

    //檢查登入狀態(檢查 LocalStorage 是否有 Token)
    if (!sessionStorage.getItem("userId")) {
  Swal.fire({
    title: "未登入",
    text: "請先登入",
    icon: "warning",
    confirmButtonText: "確定",
  }).then(() => {
    router.push("/membersLogin");
  });
}


const logout = async () => {
  try {
    await axios.post("http://localhost:8081/logout");
    sessionStorage.clear(); // 清除前端儲存
    Swal.fire({
      title: "登出成功",
      text: "您已成功登出",
      icon: "success",
      confirmButtonText: "確定",
    }).then(() => {
      router.push("/membersLogin");
    });
  } catch (error) {
    console.error("登出失敗", error);
    Swal.fire({
      title: "操作錯誤",
      text: "請稍後再試",
      icon: "error",
      confirmButtonText: "好",
    });
  }
};

    const goToForgotPwd = () => {
      router.push("/membersforgotPwd1");
    };

    const goToRegister = () => {
      router.push("/membersregister");
    };

    const convertToUppercase = (field) => {
      form.value[field] = form.value[field].toUpperCase();
    };

    return {
      form,
      rules,
      memberLoginForm,
      submitForm,
      goToForgotPwd,
      convertToUppercase,
      goToRegister,
      v2Sitekey,
      recaptchaVerified,
      recaptchaExpired,
      recaptchaFailed,
    };
  },
};
</script>

<style>
#element-plus {
.MemberLogin {
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
.password-row {
  display: flex;
  align-items: center;
}
.password-row .el-input {
  flex: 1;
}
.password-row .el-button {
  margin-left: 10px; 
}
.forgot-password-col .el-button,
.send-code-btn-col .el-button {
  margin-left: 10px; 
}
.el-row {
  margin-bottom: 10px;
}
.not-member-text {
  font-size: 13px;
}
.custom-row {
  display: flex;
  align-items: center; 
}
.login-section {
  display: flex;
  margin-left: 100px; 
}

.register-section {
  display: flex;
  align-items: center;
}
}
    
</style>