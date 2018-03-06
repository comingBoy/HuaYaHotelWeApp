var net = require('./net.js')
var config = require('../config.js')

module.exports = {
  //上传酒店图片
  uploadHotelPic: function (data, callback) {
    net.request(data, config.service.uploadHotelPicUrl, function (res) {
      callback(res.data)
    })
  },

  //获取酒店图片
  getHotelPic: function (callback) {
    var data = {
      data: ''
    }
    net.request(data, config.service.getHotelPicUrl, function (res) {
      callback(res.data)
    })
  },
}