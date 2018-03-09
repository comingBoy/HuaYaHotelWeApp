var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取联系人
  async getContact(args) {
    let sql = 'SELECT * FROM contactdb where userId = ?'
    let params = [args.userId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //新建联系人
  async newContact(args) {
    let sql = 'INSERT INTO contactdb(userId, contactName, contactTel) VALUE(?,?,?)'
    let params = [args.userId, args.contactName, args.contactTel]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //删除联系人
  async delContact(args) {
    let sql = 'DELETE FROM contactdb where contactId = ?'
    let params = [args.contactId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}