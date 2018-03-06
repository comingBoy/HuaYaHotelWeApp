const hotelAlbumdb = require('../db/hotelAlbumdb.js')

module.exports = {
  uploadHotelPic: async ctx => {
    let req = ctx.request.body
    let res = await hotelAlbumdb.uploadHotelPic(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status
    }
  },

  getHotelPic: async ctx => {
    let res = await hotelAlbumdb.getHotelPic()
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      hotelAlbum: res
    }
  },
}