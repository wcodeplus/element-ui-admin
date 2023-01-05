<template>
  <section class="container">
      <el-row :gutter="20">
          <el-col :span="8">
              <el-card>
                  <div class="sub-title">所有整数</div>
                  <el-input v-model="ipt1"><template slot="append">{{ipt1}}</template></el-input>
              </el-card>
          </el-col>
          <el-col :span="8">
              <el-card> 
                  <div class="sub-title">正整数</div>
                  <el-input></el-input>
              </el-card>
          </el-col>
          <el-col :span="8">
              <el-card> 
                  <div class="sub-title">整数（含0）</div>
                  <el-input></el-input>
              </el-card>
          </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:15px;">
          <el-col :span="8">
              <el-card>
                  <div class="sub-title">Input 为受控组件，它总会显示 Vue 绑定值。</div>
                  <el-input></el-input>
              </el-card>
          </el-col>
          <el-col :span="8">
              <el-card> 
                  <div class="sub-title">正整数</div>
                  <el-input></el-input>
              </el-card>
          </el-col>
          <el-col :span="8">
              <el-card> 
                  <div class="sub-title">整数（含0）</div>
                  <el-input></el-input>
              </el-card>
          </el-col>
      </el-row>
  </section>
</template>

<script>
export default {
  name: "TableOne",
  data(){
      return {
          ipt1: ""
      }
  }
}
</script>

<style lang="scss" scoped>
.sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: #8492a6;
}
</style>