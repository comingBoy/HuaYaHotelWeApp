var net = require('./net.js')
var config = require('../config.js')

module.exports = {

  //获取可预订房型
  getCanBookRoom(data, callback) {
    net.request(data, config.service.getCanBookRoomUrl, function (res) {  
      callback(res.data)
    })
  },

  //获取联系人
  getContact(data, callback) {
    net.request(data, config.service.getContactUrl, function (res) {
      callback(res.data)
    })
  },

  //新建联系人
  newContact(data, callback) {
    net.request(data, config.service.newContactUrl, function (res) {
      callback(res.data)
    })
  },

  //删除联系人
  delContact(data, callback) {
    net.request(data, config.service.delContactUrl, function (res) {
      callback(res.data)
    })
  },

  //修改联系人
  modifyContact(data, callback) {
    net.request(data, config.service.modifyContactUrl, function (res) {
      callback(res.data)
    })
  },

  //获取我的住宿订单
  getMyRoomBook(data, callback) {
    net.request(data, config.service.getMyRoomBookUrl, function (res) {
      callback(res.data)
    })
  },

  //删除我的住宿订单
  delMyRoomBook(data, callback) {
    net.request(data, config.service.delMyRoomBookUrl, function (res) {
      callback(res.data)
    })
  },

  //取消我的住宿订单
  cancelMyRoomBook(data, callback) {
    net.request(data, config.service.cancelMyRoomBookUrl, function (res) {
      callback(res.data)
    })
  },

  //新建我的住宿订单
  newRoomBook(data, callback) {
    net.request(data, config.service.newRoomBookUrl, function (res) {
      callback(res.data)
    })
  },
}