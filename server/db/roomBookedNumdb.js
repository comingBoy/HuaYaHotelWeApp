var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取已订数量
  async getRoomBookedNum(args, args0) {
    let sql = 'SELECT * FROM roomBookedNumdb where roomTypeId = ? and date = ?'
    let params = [args.roomTypeId, args0]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //修改订单数
  async modifyRoomBook(args) {
    let sql = 'UPDATE roomBookedNumdb SET bookedNum = ? where date = ? and roomTypeId = ?'
    let params = [args.bookedNum , args.date, args.roomTypeId]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}