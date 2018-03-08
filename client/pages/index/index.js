//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var login = require('../../utils/login.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    onLoad() {
      var that = this
      qcloud.setLoginUrl(config.service.loginUrl)
      login.login(function (res) {
        var userInfo = res.userInfo
        var data = {
          openId: userInfo.openId,
          balance: 0
        }
        login.getUserInfo(data, function (res) {
          if (res.status == 1) {
            if (res.userInfo.length > 0) {
              userInfo.userId = res.userInfo[0].userId
              userInfo.balance = res.userInfo[0].balance
              getApp().globalData.userInfo = userInfo
              util.showSuccess("登录成功")
              setTimeout(function () {
                wx.reLaunch({
                  url: '../bookRoom/bookRoom',
                })
              }, 500)
            } else {
              login.newUser(data, function (res) {
                if (res.status == 1) {
                  userInfo.userId = res.userInfo[0].userId
                  userInfo.balance = res.userInfo[0].balance
                  getApp().globalData.userInfo = userInfo
                  util.showSuccess("登录成功")
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '../bookRoom/bookRoom',
                    })
                  }, 500)
                } else if (res.status == -1) {
                  util.showModel("提示", "请求失败，请重试！")
                } else if (res.status == 0) {
                  util.showModel("提示", "数据库异常！")
                } else {
                  util.showModel("提示", "请求出错！")
                }
              })
            }
            
          } else if (res.status == -1) {
            util.showModel("提示","登陆失败，请重试！")
          } else {
            util.showModel("提示","请求出错！")
          }
        })
      })
    },

})
