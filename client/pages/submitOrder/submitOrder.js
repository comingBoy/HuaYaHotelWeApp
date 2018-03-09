// pages/submitOrder/submitOrder.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenInTime: false,
    hiddenOverTime: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      room: getApp().globalData.room,
      bookDate: getApp().globalData.bookDate,
    })
    console.log(this.data.bookDate)
    console.log(this.data.room)
    var date1 = util.getCurrentDateYMD().ymd + ' ' + util.getCurrentTimeHM() + ":00"
    var date2 = this.data.bookDate.checkInDate.ymd + ' ' + "18:00:00"
    var IfInTime = util.ifInOrder(date1, date2)
    if (IfInTime) {
      this.setData({
        hiddenInTime: false,
        hiddenOverTime: true,
      })
    } else {
      this.setData({
        hiddenInTime: true,
        hiddenOverTime: false,
      })
    }
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