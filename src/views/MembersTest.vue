<template>
  <div class="test">
    <h2>測試頁面</h2>
    <p>{{ number }}</p>
    <button @click="increment">增加</button>
    <h3>待辦清單</h3>
    <div class="input-area">
      <input v-model="newItem" placeholder="新增待辦項目" />
      <button @click="addItem">新增</button>
    </div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="deleteItem(index)">刪除</button>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import Swal from "sweetalert2";




export default {

  name: "TodoList",
  setup() {
    const number = ref(1);
    const increment = () => number.value++;
    // 定義響應式數據
    const items = ref([]); // 清單項目
    const newItem = ref(""); // 輸入框的值

// 新增項目方法
const addItem = () => {
      if (newItem.value.trim()) {
        items.value.push(newItem.value); // 將新項目加入清單
        newItem.value = ""; // 清空輸入框
      } else {
        alert("請輸入有效的項目！");
      }
    };

     // 刪除項目方法
     const deleteItem = (index) => {
      items.value.splice(index, 1); // 根據索引刪除項目
    };

    return {
      number,
      increment,
      addItem,
      items,
      newItem,
      addItem,
      deleteItem,
    };



    

  },
};
</script>

<style scoped>
.test {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
</style>
