<template>
  <section class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="sub-title">三种验证（1.不让写入）</div>
          <el-form
            ref="form"
            :model="form"
            :rules="formRules"
            label-width="80px"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div class="sub-title">
            设置：rules里设置规则，且在提交时this.$refs.form.validate验证规则
          </div>
          <div class="sub-title">要求：</div>
          <div class="sub-title">1.输入时失焦验证</div>
          <div class="sub-title">2.提交时失焦验证</div>
          <div class="sub-title">3.输入时不让输入非法字符（可以不设置）</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">三种验证（2.失焦提示）</div>

          <el-divider></el-divider>
          <div class="sub-title">设置：v-model为undefined</div>
          <div class="sub-title">用处：时间、利率、纯数字ID、纯数字编号</div>
          <div class="sub-title">缺点：千分位复制不成功</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">三种验证（3.提交提示）</div>
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
  name: "FormComponent",
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
      form: {
        email: "",
      },
      formRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success("提交成功！");
        } else {
          this.$message.error("提交失败！");
        }
      });
    },
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