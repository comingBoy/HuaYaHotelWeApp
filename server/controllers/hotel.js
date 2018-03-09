const hotelAlbumdb = require('../db/hotelAlbumdb.js')

module.exports = {

  //上传酒店图片
  uploadHotelPic: async ctx => {
    let req = ctx.request.body
    let res = await hotelAlbumdb.uploadHotelPic(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status
    }
  },

  //获取酒店图片
  getHotelPic: async ctx => {
    let res = await hotelAlbumdb.getHotelPic()
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      hotelAlbum: res
    }
  },
}