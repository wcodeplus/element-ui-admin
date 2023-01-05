<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
  >
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogForm",
  props: {
    dialogFormData: {
      type: Boolean,
    },
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible: this.dialogFormData,
    };
  },
  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
      this.$emit("visibleHandle", this.dialogFormVisible);
    },
  },
  watch: {
    dialogFormData: {
      handler(newVal, oldVal) {
        this.dialogFormVisible = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
</style>