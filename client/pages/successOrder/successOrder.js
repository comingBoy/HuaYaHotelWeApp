// pages/successOrder/successOrder.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room: '',
    bookDate: '',
    ready: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showSuccess("预定成功！")
    this.setData({
      room: getApp().globalData.room,
      bookDate: getApp().globalData.bookDate,
    })
  },

  backToIndex: function() {
    wx.reLaunch({
      url: '../bookRoom/bookRoom',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      ready: true
    })
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