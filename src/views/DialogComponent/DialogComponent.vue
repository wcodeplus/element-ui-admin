<template>
  <section class="container">
    <el-row :gutter="20">
      <!-- 父子组件传值 -->
      <el-col :span="8">
        <el-card>
          <div class="sub-title">表格dialog（父子组件传值）</div>
          <el-button type="primary" @click="dialogHandle">打开弹窗</el-button>
          <el-divider></el-divider>
          <div class="sub-title">父组件：</div>
          <div class="sub-title">1.data中定义dialogVisible为false</div>
          <div class="sub-title">2.dialogHandle改变dialogVisible为true</div>
          <div class="sub-title">
            3.通过dialog-form-data="dialogVisible"传值给子组件
          </div>
          <div class="sub-title">-----</div>
          <div class="sub-title">子组件：</div>
          <div class="sub-title">
            1.props中dialog-form-data（dialogFormData）接收父组件的传值
          </div>
          <div class="sub-title">
            2.因为不能直接修改父组件传过来的props里面的值
          </div>
          <div class="sub-title">
            3.所以将传值dialogFormData赋值给data中的dialogFormVisible
          </div>
          <div class="sub-title">
            4.dialogFormVisible为子组件dialog组件的:visible.sync
          </div>
          <div class="sub-title">
            5.这时候只能接受第一次的传值 如果父组件传过来的值改变了也处理不了
          </div>
          <div class="sub-title">6.此时用watch监听dialogFormData</div>
          <div class="sub-title">
            7.有新的dialogFormData值传过来就改变dialogFormVisible
          </div>
          <div class="sub-title">
            8.同时，子组件关闭dialog后，需要通知父组件（关闭回调）
          </div>
          <div class="sub-title">9.不通知的化，父组件就一直传true过来</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">表格dialog（.sync语法糖）</div>
          <el-button type="primary" @click="dialogHandleSync"
            >打开弹窗</el-button
          >
          <el-divider></el-divider>
          <div class="sub-title">
            <div class="sub-title">:show-close="false"（关闭右上角x）</div>
            <div class="sub-title">
              :close-on-click-modal="false"（关闭框外点击）
            </div>
            <div class="sub-title">
              :close-on-press-escape="false"（关闭ESC）
            </div>
            <div class="sub-title">三者都是防止修改props报错</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">destroy-on-close</div>
          <el-input></el-input>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 15px">
      <el-col :span="8">
        <el-card>
          <div class="sub-title">append-to-body</div>
          <el-input></el-input>
        </el-card>
      </el-col>
    </el-row>
    <dialog-form
      :dialog-form-data="dialogVisible"
      @visibleHandle="visibleHandle"
    ></dialog-form>
    <dialog-sync
      :dialog-visible="isShow"
      @dialog-cancel="isShow = false"
    ></dialog-sync>
    <!-- <dialog-sync :isShow="isShow" @update="val => isShow = val"></dialog-sync> -->
  </section>
</template>

<script>
import DialogForm from "./components/DialogForm.vue";
import DialogSync from "./components/DialogSync.vue";

export default {
  name: "DialogComponent",
  components: {
    DialogForm,
    DialogSync,
  },
  data() {
    return {
      ipt1: "",
      dialogVisible: false,
      isShow: false,
    };
  },
  methods: {
    dialogHandle() {
      this.dialogVisible = true;
    },
    visibleHandle(data) {
      this.dialogVisible = data;
    },
    dialogHandleSync() {
      this.isShow = true;
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