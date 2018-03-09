// pages/hotelDetail/hotelDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: [
      { serviceImg: '../../images/WiFi.png', serviceName: '无线上网' },
      { serviceImg: '../../images/wired.png', serviceName: '有线上网' },
      { serviceImg: '../../images/park.png', serviceName: '停车场' },
      { serviceImg: '../../images/luggage.png', serviceName: '行李寄存' },
      { serviceImg: '../../images/canting.png', serviceName: '餐厅' },
      { serviceImg: '../../images/hotWater.png', serviceName: '热水洗浴' },
      { serviceImg: '../../images/hairDrier.png', serviceName: '电吹风' },
      { serviceImg: '../../images/toothBrust.png', serviceName: '洗漱用品' },
      { serviceImg: '../../images/clock.png', serviceName: '叫醒服务' },
      { serviceImg: '../../images/ring.png', serviceName: '送餐服务' },
    ],
    tell: '15360591018'
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

  },
  callHotel: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.tell,
    })
  }
})