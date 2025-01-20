//app
import { createApp } from "vue";
import App from "./App.vue";
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
const app = createApp(App);


//vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


const vuetify = createVuetify({
    components,
    directives, theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                },
            },
        },
    },
});

app.use(vuetify)

//router
import router from "./router"; // 引入路由
app.use(router);

//pinaia
import { createPinia } from "pinia";
app.use(createPinia())

//mount
// app.mount("#app");
app.use(Antd).mount('#app');


//other
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);


