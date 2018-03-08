// pages/submitOrder/submitOrder.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenInTime: false,
    hiddenOverTime: false,
    roomNum: ['一间', '两间', '三间', '四间', '五间', '六间', '七间', '八间', '九间', '十间'],
    roomIndex: 0,
    customerName: ["每间需要填写一人姓名"]
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

  },
  /**
   * 房间数选择
   */
  chooseRoomNum: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num1 = parseInt(e.detail.value) + 1
    console.log(num1)
    var customerNameArray = new Array(num1)
    console.log(customerNameArray.length)
    for (var i=0; i< customerNameArray.length;i++){
      customerNameArray[i] = "每间需要填写一人姓名"
    }
    console.log(customerNameArray)
    this.setData({
      roomIndex: e.detail.value,
      customerName: customerNameArray
    })
  },
/**
 * 输入房间入住人
 */
  enterNmae:function(e){
    console.log(e.currentTarget.id)
    var customerNameArray = this.data.customerName
    console.log(customerNameArray.length)
    customerNameArray[e.currentTarget.id] = e.detail.value
    console.log(customerNameArray.length)
    this.setData({
      customerName: customerNameArray
    })
    console.log(customerNameArray.length)
  }
})