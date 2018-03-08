var qcloud = require('../vendor/wafer2-client-sdk/index.js')
var util = require('./util.js')
var config = require('../config.js')
var net = require('./net.js')
module.exports = {
  login: function (callback) {
    var res = {
      userInfo: null
    }
    util.showBusy('正在登录')
    qcloud.login({
      success(result) {
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            res.userInfo = result.data.data,
              callback(res)
          },

          fail(error) {
            util.showModel('请求失败', error)
            console.log('request fail', error)
            callback(res)
          }
        })
      },

      fail(error) {
        util.showModel('登录失败', error)
        callback(res)
      }
    })
  },

  getUserInfo: function (data, callback) {
    net.request(data, config.service.getUserInfoUrl, function (res) {
      callback(res.data)
    })
  },

  newUser: function (data, callback) {
    net.request(data, config.service.newUserUrl, function (res) {
      callback(res.data)
    })
  }
}