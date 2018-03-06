var mysqlHelper = require("./mysqlHelper.js")

module.exports = {
  async uploadHotelPic(args) {
    let sql = 'INSERT INTO hotelAlbumdb(picture) VALUE(?)'
    let params = [args.picture]
    let result = mysqlHelper.query(sql, params)
    return result
  },

  async getHotelPic(args) {
    let sql = 'SELECT * FROM hotelAlbumdb'
    let params = []
    let result = mysqlHelper.query(sql, params)
    return result
  },
}