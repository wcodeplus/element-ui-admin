import { showAmount, showWeight, showRate, formatDate } from "./support";

export const formatterAmountCell = (row = {}, column) => {
  return showAmount(row[column.property]);
};
export const formatterWeightCell = (row = {}, column) => {
  return showWeight(row[column.property]);
};
export const formatterRateCell = (row = {}, column) => {
  return showRate(row[column.property]);
};
export const formatterOtherCell = (row = {}, column) => {
  return row[column.property] == null ? "-" : row[column.property];
};
export const formatterOtherCell2 = (row = {}, column) => {
  // eslint-disable-next-line eqeqeq
  return row[column.property] == "" ? "-" : row[column.property];
};
export const formatterDateTimeCell = (row = {}, column) => {
  return formatDate(row[column.property], "YYYY-MM-DD HH:mm:ss");
};
export const formatterDateCell = (row = {}, column) => {
  return formatDate(row[column.property], "YYYY-MM-DD");
};
