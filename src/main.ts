import { createApp, createVNode } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "@/router";
import { store, key } from "@/store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

console.log(ElementPlusIconsVue);

const app = createApp(App);

app.use(router).use(store, key).use(ElementPlus).mount("#app");

// 图标引入注册 方式一
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // console.log(key, component);
  app.component(key, component);
}

// 图标引入注册 方式二
const Icon = (props: { icon: string }) => {
  const { icon } = props;
  return createVNode(
    ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue]
  );
};
app.component("Icon", Icon);

//方式二
// const Icon = (props:{icon:string}) =>{
//     const {icon} = props;
//     return createVNode(Icons[icon as keyof typeof Icons])
// }
// app.component('Icon',Icon)
