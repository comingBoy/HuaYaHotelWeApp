var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取我的住宿订单
  async getMyRoomBook(args, args0) {
    let sql = 'SELECT * FROM roomBookdb where userId = ? and userDelete = 0'
    let params = [args.userId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //删除我的住宿订单
  async delMyRoomBook(args) {
    let sql = 'UPDATE roomBookdb SET userDelete = 1 where roomBookId = ?'
    let params = [args.roomBookId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //取消我的住宿订单
  async cancelContact(args) {
    let sql = 'DELETE FROM roomBookdb where roomBookId = ?'
    let params = [args.roomBookId]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  //新建住宿订单
  async newRoomBook(args) {
    let sql = 'INSERT INTO roomBookdb(userId, contactId, RoomTypeId, bookRoomNum, totalPrice, checkInDate, checkOutDate, comeTime, bookTel, ifFinish, userDelete) VALUE(?,?,?,?,?,?,?,?,?,?,?)'
    let params = [args.userId, args.contactId, args.roomTypeId, args.bookRoomNum, args.totalPrice, args.checkInDate, args.checkOutDate, args.comeTime, args.bookTel, args.ifFinish, args.userDelete]
    let result = mysqlHelper.query(sql, params)
    return result
  },
}