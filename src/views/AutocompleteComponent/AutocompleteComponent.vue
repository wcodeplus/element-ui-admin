<template>
  <section class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="sub-title">自动完成（远程搜索）-普通</div>
          <el-autocomplete
            v-model.trim="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <el-divider></el-divider>
          <div class="sub-title">选中：{{ selectVal.value }}</div>
          <div class="sub-title">特殊要求：复制带有空格的字符串进行搜索</div>
          <div class="sub-title">
            解决：v-model.trim没法完成，需要在querySearchAsync手动清除一次
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">自动完成（远程搜索）-清空</div>
          <el-autocomplete
            v-model="state2"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect2"
            @blur="withoutSelect2"
            @clear="clearSelect2"
          >
          </el-autocomplete>
          <el-divider></el-divider>
          <div class="sub-title">产品要求：没选中清空输入框</div>
          <div class="sub-title">
            隐藏点：如不加锁，第一次选中后，不会再自动清空输入框
          </div>
          <div class="sub-title">选中：{{ selectVal2.value }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">自动完成（远程搜索）-下拉内容自定义</div>
          <el-autocomplete
            v-model="state3"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect2"
            @blur="withoutSelect2"
            @clear="clearSelect2"
          >
            <template slot-scope="{ item }">
              {{ item.value }} - {{ item.price }}
            </template>
          </el-autocomplete>
          <el-divider></el-divider>
          <div class="sub-title">产品要求：下拉自定义</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="sub-title">自动完成-下拉和显示自定义</div>
          <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect4"
          >
            <template slot-scope="{ item }">
              {{ item.value }} - {{ item.price }}
            </template>
          </el-autocomplete>
          <el-divider></el-divider>
          <div class="sub-title">产品要求：下拉和显示自定义</div>
          <div class="sub-title">选中值：{{ state4 }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="sub-title">自动完成-下拉和显示自定义</div>
          <el-autocomplete
            v-model="state5"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect5"
            @blur="blurSelect5"
          >
            <template slot-scope="{ item }">
              {{ item.value }} - {{ item.price }}
            </template>
          </el-autocomplete>
          <el-divider></el-divider>
          <div class="sub-title">产品要求：下拉和显示自定义</div>
          <div class="sub-title">其他要求：选中值要求正常</div>
          <div class="sub-title">选中值：{{ state5 }}</div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "AutocompleteComponent",
  data() {
    return {
      state: "",
      state2: "",
      state3: "",
      state4: "",
      state5: "",
      state5Plus: "",
      selectVal: "",
      selectVal2: "",
      selectStatus2: false,
    };
  },
  methods: {
    querySearchAsync(name, cb) {
      const newName = name.trim(); // 再用newName去搜索
      this.$http.get("/home/getData").then((res) => {
        console.log("res :>> ", res);
        if (res.status === 200) {
          const list = (res.data.data.tableData || []).map((item) => {
            return { value: item.name, price: item.todayBuy };
          });
          cb(list);
        }
      });
    },
    handleSelect(val) {
      console.log("val :>> ", val);
      this.selectVal = val;
    },
    // 选中后的回调
    handleSelect2(val) {
      console.log("val :>> ", val);
      this.selectVal2 = val;
      // 加锁：选中后
      this.selectStatus2 = true;
    },
    // 清空选择或输入项
    clearSelect2() {
      this.state2 = "";
      // 加锁：清空后
      this.selectStatus2 = false;
    },
    // 未选中后的回调
    withoutSelect2() {
      this.state2 = "";
      // 加锁：未选中
      this.selectStatus2 = false;
    },
    handleSelect4(val) {
      this.state4 = val.value + " - " + val.price;
    },
    handleSelect5(val) {
      this.state5 = val.value;
      this.state5Plus = val.value + " - " + val.price;
    },
    blurSelect5(e) {
      setTimeout(() => {
        e.target.value = this.state5Plus;
      }, 100);
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