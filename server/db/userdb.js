var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取用户资料
  async getUserByOpenId(args) {
    let sql = 'SELECT * FROM userdb where openId = ?'
    let params = [args.openId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //新建用户
  async newUser(args) {
    let sql = 'INSERT INTO userdb(openId, balance) VALUE(?,?)'
    let params = [args.openId, args.balance]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}