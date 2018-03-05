// pages/uploadImg/uploadImg.js
var hotel = require('../../utils/hotel.js')
var config = require('../../config.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  chooseCover: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: "compressed",
      success: function (res) {
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {       
            res = JSON.parse(res.data)
            var data = {
              picture: res.data.imgUrl
            }
            hotel.uploadHotelPic(data, function (res) {
              if (res.status == 1) {
                util.showSuccess('上传图片成功')
              }
            })
          },
          fail: function (e) {
            util.showModel('提示', '上传图片失败')
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})