<template>
  <div class="ForgotPwd1">
    <h2>請填寫身分證字號及手機號碼</h2>
    <el-form :model="form" :rules="rules" ref="memberLoginForm" label-width="100px">
      <!-- 身分證字號欄位 -->
      <el-form-item label="身分證字號" prop="userid">
        <el-col :span="18">
          <el-input 
  v-model="form.userid" 
  placeholder="格式:A123456789" 
  maxlength="10" 
  minlength="10" 
 
  @blur="convertToUppercase('userid')">
</el-input>
      </el-col>
      </el-form-item>

      <!-- 手機號碼欄位 -->
      <el-form-item label="手機號碼" prop="phone">
        <el-col :span="18">
        <el-input 
          v-model="form.phone" 
          placeholder="請輸入註冊時的手機號碼" 
          maxlength="10" 
          minlength="10">
        </el-input>
      </el-col>
      </el-form-item>

      <!-- 登入按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">確認送出</el-button>
      </el-form-item>
    </el-form>
   
  </div>
  
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "MemberLogin",
  setup() {
    const router = useRouter(); 
    const form = ref({
      userid: "",
      phone: "",
      verificationCode: "",
    });

    const rules = ref({
  userid: [
    { required: true, message: "請輸入身分證字號", trigger: "blur" },
    { 
      validator: (rule, value, callback) => {
        const idRegex = /^[A-Z][1-2]\d{8}$/; // 台灣身分證字號格式
        if (!idRegex.test(value)) {
          callback(new Error("身分證字號格式不正確"));
        } else {
          callback();
        }
      }, 
      trigger: "blur" 
    },
  ],
      phone: [
        { required: true, message: "請輸入手機號碼", trigger: "blur" },
        { min: 10,  max: 10,message: "電話號碼格式有誤", trigger: "blur" },
        { 
    pattern: /^09\d{8}$/, 
    message: "電話號碼格式有誤，需為 09 開頭的 10 位數字", 
    trigger: "blur" 
  }
      ],
    });

    const memberLoginForm = ref(null);
  
    const convertToUppercase = (field) => {
  form.value[field] = form.value[field].toUpperCase();
};

    const sendVerificationCode = () => {
      if (!form.value.userid) {
        ElMessage.error("請先輸入身分證字號");
        return;
      }
    };

    const submitForm = () => {
      memberLoginForm.value.validate((valid) => {
        if (valid) {

          Swal.fire({
            title: "重設密碼函已發送至您註冊的電子郵件",
            text: "請於10分鐘內修改",
            icon: "success",
            confirmButtonText: "確定",
          }).then(() => {
            // SweetAlert 點擊確定後跳轉至登入頁面
            router.push("/membersLogin");
          });
          console.log("表單已通過驗證", form.value);
        } else {
          Swal.fire({
            title: "資料有誤",
            text: "請檢查資料填寫是否正確",
            icon: "error",
            confirmButtonText: "好",
          });
          console.log("身分證或手機號碼有誤，請重新輸入");
          return false;
        }
      });
    };

    const resetForm = () => {
      memberLoginForm.value.resetFields();
    };
    const goToForgotPwd = () => {
      router.push('/forgotPwd1');
    };
    return {
      form,
      rules,
      memberLoginForm,
      sendVerificationCode,
      submitForm,
      resetForm,
      goToForgotPwd, 
      convertToUppercase,
    };
  },
  
};
</script>

<style scoped>
.ForgotPwd1 {
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