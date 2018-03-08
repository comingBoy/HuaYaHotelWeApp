var net = require('./net.js')
var config = require('../config.js')

module.exports = {

  //获取可预订房型
  getCanBookRoom(data, callback) {
    net.request(data, config.service.getCanBookRoomUrl, function (res) {
      callback(res.data)
    })
  }
}