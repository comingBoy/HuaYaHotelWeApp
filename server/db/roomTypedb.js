var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取所有房型
  async getAllRoomType(args) {
    let sql = 'SELECT * FROM roomTypedb'
    let params = []
    let result = mysqlHelper.query(sql, params)
    return result
  },
}