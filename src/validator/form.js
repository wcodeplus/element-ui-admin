export const checkAmountMin = (rule, value, callback) => {
  if (value.length > 20) {
    callback(new Error("长度小于20"));
  } else if (Number.isNaN(Number(value))) {
    callback(new Error("请输入数字数值"));
  } else if (Number(value) < 0) {
    callback(new Error("数值要大于零"));
  } else {
    callback();
  }
};
export const checkAmountMax = (rule, value, callback) => {
  if (value.length > 20) {
    callback(new Error("长度小于20"));
  } else if (Number.isNaN(Number(value))) {
    callback(new Error("请输入数字数值"));
  } else if (Number(value) < 0) {
    callback(new Error("数值要大于零"));
  } else {
    callback();
  }
};
export const checkRelationId = (rule, value, callback) => {
  if (value.length > 18) {
    callback(new Error("长度小于18"));
  } else if (Number.isNaN(Number(value))) {
    callback(new Error("请输入数字数值"));
  } else if (Number(value) < 0) {
    callback(new Error("数值要大于零"));
  } else {
    callback();
  }
};
export const checkSearialNum = (rule, value, callback) => {
  if (value.length > 100) {
    callback(new Error("长度小于100"));
  } else if (Number(value) < 0) {
    callback(new Error("数值要大于零"));
  } else {
    callback();
  }
};
export const checkNumber = (rule, value, callback) => {
  if (value.length > 20) {
    callback(new Error("长度小于20"));
  } else if (Number.isNaN(Number(value))) {
    callback(new Error("请输入数字数值"));
  } else if (Number(value) < 0) {
    callback(new Error("数值要大于零"));
  } else {
    callback();
  }
};
