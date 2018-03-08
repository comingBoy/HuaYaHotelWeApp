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
    let sql = 'INSERT INTO userdb(userName, avatar, openId) VALUE(?,?,?)'
    let params = [args.userName, args.avatar, args.openId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}