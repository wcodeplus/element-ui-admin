## 环境
- node 16.18.0
- npm 8.19.2
- Vue CLI 5.0.8

## 创建
安装
- npm install webpack -g
- npm install @vue/cli -g --unsafe-perm
- vue create element-ui-admin
运行
- cd element-ui-admin
- npm run serve
- 本地跑起来了 http://localhost:8080/
补充
- element-ui
    - npm i element-ui --save
- vuex
    - npm i vuex@3 --save-dev
- sass
    - npm install sass-loader@8.0.2 sass@1.26.5  --save-dev
- axios
    - npm install axios --save
- mockjs
    - npm i mockjs --save

> --save等同于-S，--save-dev 等同于 -D； 区别在于 package.json 中只能用小写的

```
import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //引入 vue-router
import store from "./store"; //引入 vuex
// 全局配置
import "@/assets/scss/reset.scss"; //全局样式
import "element-ui/lib/theme-chalk/index.css"; //element-ui样式
import http from "@/api/config"; //axios
import "./mock"; // mockjs
// 第三方包
import ElementUI from "element-ui";
Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```
补充一下router、vuex和main中对应的文件夹和文件
> 参考：https://www.cnblogs.com/qdhxhz/p/12586292.html https://github.com/yudiandemingzi/mall-manage-system/blob/master/01-manage-system-home/src/router/index.js

## 待整理
- element一些用法：https://zhuanlan.zhihu.com/p/421935372
- 钱的插件：https://github.com/kevinongko/vue-numeric

- input的blur问题：https://blog.csdn.net/baidu_41601048/article/details/110918737 （原始提示，message级别，第7点验证一下）
- 汇总问题：https://blog.csdn.net/qq_43494333/article/details/123704376
- 汇总问题：https://www.jianshu.com/p/cc036006f7fe
- 校验属性层级比较深,无法触发规则校验：https://www.jianshu.com/p/90db28e7add7

紧急
- 处理一下昨天碰到的那个切换验证问题 jinrong_console 仓库 jinrong_console\src\views\vipbsr\trade\change_pick_ways.vue 文件 574行

## 下一篇
做jest的前端测试
参考
- https://jspang.com/article/65
- https://www.w3cschool.cn/jest_cn/



<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="isRefresh">
      <el-form-item label="金额">
        <el-input
          v-model.trim="formInline.money"
          placeholder="输入金额"
          maxlength="20"
          v-money="{max: 10000000, min: -10000000, precision: 3, round: true, isThousand: true}"
          ref="mInput"
        ></el-input>
        {{ this.formInline.money }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        {{ this.formInline.a }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getTimestamp3, getTimestamp2} from "@/utils/time";

export default {
  data() {
    return {
      isRefresh: true,
      formInline: {
        money: "",
        a: 1
      }
    };
  },
  methods: {
    getTimestamp3,
    getTimestamp2,
    onSubmit() {
      console.log("submit!", typeof this.getTimestamp3("2022-11-17"));
      this.formInline.a = this.getTimestamp3("2022-11-17");
    }
  },
  mounted() {
    this.$set(this.formInline, "money", "11,021.1542131");
    // this.formInline.money = "11,021.1542131";

    /* 方法一 */
    // this.$nextTick(() => {
    //   this.$refs.mInput.focus();
    //   this.$refs.mInput.blur();
    // });

    /* 方法二 */
    // this.$nextTick(() => {
    //   this.$forceUpdate();
    // });

    /* 方法三 */
    this.$nextTick(() => {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
}
</style>
