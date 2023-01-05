import Vue from "vue";
import {
  getValueWithDropSeparator,
  setValueWithAddSeparator,
  getUserAgent,
  changeDecimal,
  kUserAgent,
} from "./support";

/**
 * @info v-money="{max:1e12,min:0,precision:2,round:true,isThousand:true}"
 * @params max 最大值
 * @params min 最小值
 * @params precision 几位小数
 * @params round 为 true 直接截断
 * @notice el-input 里面的 v-model 修饰符不要用 number，用 trim 即可
 *
 * ----------20221028更新-------------
 * 1.输入：正负、整数小数，number/string
 * 2.粘贴：正负、整数小数、千分位，number/string
 * 3.赋值：正负、整数小数、千分位，number/string
 * 4.显示：正负、要求的小数位、千分位
 * 5.输出：正负、要求的小数位、不带千分位
 *
 * ----------20221110更新-------------
 * 1.keydown 的事件监听加个判断，兼容 mac 电脑 safari 浏览器的粘贴功能
 * 2.回显页面，建议在 mounted 里面加上以下代码，兼容 this.$set 赋值和复杂层级页面等情况
    this.$nextTick(() => {
      // mInput 为 el-input 的 ref 值
      this.$refs.mInput.focus();
      this.$refs.mInput.blur();
    });
 *
 */
Vue.directive("Money", {
  bind(el, binding, vNode) {
    const input = el.getElementsByTagName("input")[0];
    const setVal = (val) => {
      if (vNode.componentInstance) {
        vNode.componentInstance.$emit("input", val);
      } else {
        el.value = val;
        el.dispatchEvent(new Event("input"));
      }
    };

    // 键盘按下
    if (getUserAgent() !== kUserAgent.Safari) {
      el.addEventListener("keypress", (event) => {
        const e = event || window.event;
        const inputKey = String.fromCharCode(
          typeof e.charCode === "number" ? e.charCode : e.keyCode
        );
        const re = /\d|\.|-/;
        const content = e.target.value;
        function preventInput() {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
        if (!re.test(inputKey) && !e.ctrlKey) {
          preventInput();
        } else if (content.indexOf(".") > 0 && inputKey === ".") {
          preventInput();
        }
      });
    }

    // 键盘松开
    el.addEventListener("keyup", (event) => {
      const e = event || window.event;
      const val = e.target.value || "";
      // 不在区间的输入值，默认取min或max
      if (binding.value) {
        if (
          Number(binding.value.min) !== undefined &&
          Number(binding.value.min) > val
        ) {
          setVal(binding.value.min);
          e.target.value = Number(binding.value.min);
        }
        if (
          Number(binding.value.max) !== undefined &&
          Number(binding.value.max) < val
        ) {
          setVal(binding.value.max);
          e.target.value = Number(binding.value.max);
        }
      }
    });

    // 添加鼠标进入事件
    el.addEventListener("focusin", (event) => {
      const e = event || window.event;
      e.target.value = getValueWithDropSeparator(e.target.value);
    });

    // 添加鼠标失去焦点事件
    el.addEventListener("focusout", (event) => {
      const e = event || window.event;
      // 兼容处理“复制”进去时候带千分位逗号
      let val = getValueWithDropSeparator(e.target.value);
      if (val === undefined || val === null || val === "") {
        setVal(val);
        return;
      }

      val = parseFloat(val);
      let arg_precision = 0;
      if (binding.value.precision) {
        arg_precision = parseFloat(binding.value.precision);
      }
      // 不四舍五入
      if (binding.value.round && arg_precision !== 0) {
        val = val ? changeDecimal(val, arg_precision) : val;
      } else if (val === 0) {
        val = val.toFixed(arg_precision);
      } else {
        val = val ? val.toFixed(arg_precision) : val;
      }
      // 处理非法输入
      if (Number.isNaN(val)) {
        val = "";
      }
      setVal(val);
      // 千分位显示
      if (binding.value.isThousand) {
        setTimeout(() => {
          e.target.value = setValueWithAddSeparator(val, 3);
        }, 300);
      }
    });
  },

  inserted(el, binding) {
    if (binding.value.isThousand) {
      const input = el.getElementsByTagName("input")[0];
      if (
        input.value === "" ||
        input.value === undefined ||
        input.value === null
      )
        return;
      let val = parseFloat(getValueWithDropSeparator(input.value));
      const precision = Number(binding.value?.precision || 2);
      if (!binding.value.round) {
        val = val.toFixed(precision);
      } else {
        val = val.toFixed(precision + 1);
        val = val.substring(0, val.indexOf(".") + precision + 1);
      }
      if (binding.value.isThousand) {
        setTimeout(() => {
          input.value = setValueWithAddSeparator(val, 3);
        }, 0);
      }
    }
  },

  componentUpdated(el, binding) {
    const input = el.getElementsByTagName("input")[0];
    if (input.value === "" || input.value === undefined || input.value === null)
      return;
    let val = parseFloat(getValueWithDropSeparator(input.value));
    const precision = Number(binding.value?.precision || 2);
    if (!binding.value.round) {
      val = val.toFixed(precision);
    } else {
      val = val.toFixed(precision + 1);
      val = val.substring(0, val.indexOf(".") + precision + 1);
    }
    if (binding.value.isThousand) {
      input.value = setValueWithAddSeparator(val, 3);
    }
  },
});
