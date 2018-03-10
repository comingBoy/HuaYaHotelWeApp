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

  //获取新建的联系人
  async getNewContact(args) {
    let sql = 'SELECT * FROM contactdb where contactId in(select max(contactId) from contactdb WHERE userId = ?)'
    let params = [args.userId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //修改联系人
  async modifyContact(args) {
    let sql = 'UPDATE contactdb SET contactTel = ? where contactId = ?'
    let params = [args.contactTel, args.contactId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

}