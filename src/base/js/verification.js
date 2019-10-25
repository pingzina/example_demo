//手机号的验证
let checkPhone = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else {
      const reg = /^1[0-9]{10}$/
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    }
  }
  // 密码的验证
  let checkPassword = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('密码不能为空'));
    } else {
      const reg =/^[\w-]{6,18}$/
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的密码'));
      }
    }
  }
export {checkPhone,checkPassword}