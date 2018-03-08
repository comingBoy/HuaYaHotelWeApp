var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取已订数量
  async getBookedNum(args, args0) {
    let sql = 'SELECT * FROM roomBookedNumdb where roomTypeId = ? and date = ?'
    let params = [args.roomTypeId, args0]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}