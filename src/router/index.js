import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//修改router的跳转事件（重复点击菜单），取消报错提示。
const originalReplace = VueRouter.prototype.replace;
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 完整路由代码
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Main"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home/Home"),
        },
        {
          path: "/input",
          name: "input",
          component: () => import("@/views/InputComponent/InputComponent"),
        },
        {
          path: "/dialog",
          name: "dialog",
          component: () => import("@/views/DialogComponent/DialogComponent"),
        },
        {
          path: "/autocomplete",
          name: "autocomplete",
          component: () =>
            import("@/views/AutocompleteComponent/AutocompleteComponent"),
        },
        {
          path: "/loading",
          name: "loading",
          component: () => import("@/views/LoadingComponent/LoadingComponent"),
        },
        {
          path: "/form",
          name: "form",
          component: () => import("@/views/FormComponent/FormComponent"),
        },
        {
          path: "/table1",
          name: "table1",
          component: () => import("@/views/TableComponent/TableOne"),
        },
        {
          path: "/table2",
          name: "table2",
          component: () => import("@/views/TableComponent/TableTwo"),
        },
      ],
    },
  ],
});
