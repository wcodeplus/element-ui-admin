import moment from "moment";

// 手动触发数据双向绑定的更新
export const trigger = (vnode, input) => {
  if (vnode.componentInstance) {
    vnode.componentInstance.$emit("input", input.value);
  } else {
    vnode.elm.dispatchEvent(new CustomEvent("input", input.value));
  }
};

// 去除数值的分隔符
export const getValueWithDropSeparator = (value = "") => {
  let realVal = value;
  if (value != null) {
    realVal = String(value);
  }
  if (typeof realVal === "string") {
    return realVal.replace(/,/gi, "");
  }
  return value;
};

// 给数值增加分隔符
export const setValueWithAddSeparator = (value = "", digit = 3) => {
  if (!value) {
    return value;
  }
  let integer = String(value);
  let decimal = "";
  if (String(value).includes(".")) {
    [integer, decimal] = String(value).split(".");
    decimal = `.${decimal}`;
  }
  let str = decimal;

  const { length } = integer || "";
  let base = 0;
  if (integer[0] === "-") {
    base = 1;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = length - 1; i >= base; i--) {
    const val = integer[i];
    str = val + str;
    const isMultipleDigit = (length - i) % digit === 0;
    if (isMultipleDigit && i !== base) {
      str = `,${str}`;
    }
  }
  if (base === 1) {
    str = integer[0] + str;
  }
  return str;
};

export const kUserAgent = {
  Opera: "Opera",
  FF: "FF",
  Chrome: "Chrome",
  Safari: "Safari",
  IE: "IE",
};
// 取得浏览器的userAgent字符串
export const getUserAgent = () => {
  const { userAgent } = navigator;
  if (userAgent.indexOf("Opera") > -1) {
    // 判断是否Opera浏览器
    return kUserAgent.Opera;
  }
  if (userAgent.indexOf("Firefox") > -1) {
    // 判断是否Firefox浏览器
    return kUserAgent.FF;
  }
  if (userAgent.indexOf("Chrome") > -1) {
    // 判断是否为谷歌浏览器
    return kUserAgent.Chrome;
  }
  if (userAgent.indexOf("Safari") > -1) {
    // 判断是否Safari浏览器
    return kUserAgent.Safari;
  }
  if (
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    userAgent.indexOf("Opera") > -1
  ) {
    // 判断是否IE浏览器
    return kUserAgent.IE;
  }
  return "";
};

/**
 * 将number保留bitNum位小数，不够补0
 * @param number
 * @param bitNum
 * @returns {string|number}
 */
export const changeDecimal = (number, bitNum) => {
  const f_x = parseFloat(number);
  if (Number.isNaN(f_x)) {
    return 0;
  }
  let s_x = number.toString();
  let pos_decimal = s_x.indexOf(".");
  // 没有小数点的加上小数点
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    if (bitNum !== 0) {
      s_x += ".";
    } else {
      // 没有小数点还要保留0位小数
      console.log("s_x:", s_x);
      return s_x;
    }
  }
  if (s_x.length <= pos_decimal + bitNum) {
    // eg:122 保留2位小数
    // return 122.00
    while (s_x.length <= pos_decimal + bitNum) {
      s_x += "0";
    }
  } else {
    // eg:1.222222  保留2位小数
    // return 1.22
    s_x = s_x.substring(0, pos_decimal + bitNum + 1);
  }
  return s_x;
};

/**
 * @param {Number} num
 * @return {String}
 * @description 数字类型转千分位字符串
 */
export const numToThs = (num = "") => {
  if (!num) {
    return "0.00";
  }
  const numArray = num.toString().split(".");
  return `${numArray[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}${
    numArray[1] ? `.${numArray[1]}` : ""
  }`;
};

/**
 * number.toFixed保留小数点
 * @param {*} value 值
 * @param {*} count 保留几位小数
 */
export function toFixed(value, count = 2) {
  const number = +value;
  if (Number.isNaN(value) || Number.isNaN(number)) {
    return "";
  }
  if (number % 1 === 0) {
    return `${number}.${Array(count).fill(0).join("")}`;
  }
  return round(number, count);
}

export const showAmount = (value) => {
  // eslint-disable-next-line eqeqeq
  if (value != undefined) {
    const realValue = String(value).replace(/,/g, "");
    return value === null ? "0.00" : numToThs(toFixed(realValue, 2));
  }
  return numToThs(toFixed(value, 2));
};

export const showWeight = (value) => {
  return value === null ? "0.000" : numToThs(toFixed(value, 3));
};

export const showRate = (value) => {
  return value === null ? "0.0000" : numToThs(toFixed(value, 4));
};

export const formatDate = (value, format = "YYYY-MM-DD") => {
  return value ? moment(value).format(format) : "";
};
