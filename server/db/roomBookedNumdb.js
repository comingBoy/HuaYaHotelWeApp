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
  async modifyRoomBookedNum(args) {
    let sql = 'UPDATE roomBookedNumdb SET bookedNum = ? where date = ? and roomTypeId = ?'
    let params = [args.bookedNum, args.date, args.roomTypeId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //新建订单数
  async newRoomBookedNum(args) {
    let sql = 'INSERT INTO roomBookedNumdb(roomTypeId, date, bookedNum) VALUE(?,?,?)'
    let params = [args.roomTypeId, args.date, args.bookedNum]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}