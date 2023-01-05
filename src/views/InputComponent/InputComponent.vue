<template>
  <section class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="sub-title">金额</div>
          <el-input
            v-model="ipt1"
            v-money="{
              max: 1e19,
              min: 0,
              precision: 4,
              round: true,
              isThousand: true,
            }"
          >
            <template slot="append">{{ ipt1 }}</template>
          </el-input>
          <el-divider></el-divider>
          <div class="sub-title">设置：v-money指令</div>
          <div class="sub-title">用处：千分位小数金额</div>
          <div class="sub-title">缺点：</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">InputNumber 组件</div>
          <el-input-number
            v-model="ipt21"
            :precision="2"
            :min="0"
            :max="100"
            :controls="false"
            placeholder="请输入"
          >
          </el-input-number
          ><span>{{ ipt21 }}</span>
          <el-divider></el-divider>
          <div class="sub-title">设置：v-model为undefined</div>
          <div class="sub-title">用处：时间、利率、纯数字ID、纯数字编号</div>
          <div class="sub-title">缺点：千分位复制不成功</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">正整数</div>
          <el-input></el-input>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 15px">
      <el-col :span="8">
        <el-card>
          <div class="sub-title">正整数</div>
          <el-input></el-input>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">正整数</div>
          <el-input></el-input>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "InputComponent",
  data() {
    //校验邮箱的规则
    const checkEmail = (rule, value, callback) => {
      const reg =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的邮箱"));
      }
      callback();
    };

    // 验证手机号的规则
    const checkMobile = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的手机号码"));
      }
      callback();
    };
    return {
      ipt1: "",
      ipt21: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
.sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: #8492a6;
}
</style>