import { toFixed, numToThs } from "./support";
/**
 * @desc 数字格式化千分位 10000 => "10,000"
 * @param {number} num
 * @return {String}
 */
export function formatThousand(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}
/**
 * @desc 千分位格式化为数字 "10,000" => 10000
 * @param {string} unit
 * @return {String}
 */
export function formatNumber(unit) {
  if (typeof unit === "string") {
    return Number(unit.split(",").join("")) || 0;
  }
  return unit;
}
/**
 * @desc 价格保留两位小数带千分位 1234.567 => 1,234.56
 * @param {Number} val
 * @return {String}
 */
export const formatAmount = (val) => {
  return numToThs(toFixed(val, 2));
};
/**
 * @desc 利率保留四位小数
 * @param {Number} rate
 * @return {String}
 */
export function formatRate(rate) {
  return rate && Number(rate) ? numToThs(toFixed(rate, 4)) : "0.0000";
}
/**
 * @desc 重量保留四位小数
 * @param {Number} weight
 * @return {String}
 */
export function formatWeight(weight) {
  return weight && Number(weight) ? numToThs(toFixed(weight, 4)) : "0.0000";
}
