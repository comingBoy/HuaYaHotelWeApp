// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxLength: 7,
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
  /**
   * 输入充值金额
   */
  inputAmount: function (e) {
    var value = e.detail.value
    var result = value.match(/[.]/g)
    if (result != null) {
      console.log(123)
      if (result.length > 1) {
        value = value.substr(0, value.length - 1)
        return value
      }
    } else {
      //没有小数点，设置为8位
      this.setData({
        maxLength: 8
      })
    }
    //设置小数点后两位
    if (value[value.length - 1] == '.') {
      this.setData({
        maxLength: value.length + 2
      })
    }
    //如果第8位不为.会回删
    if (value.length == 8 && value.match(/[.]/g) == null) {
      value = value.substr(0, value.length - 1)
      return value
    }
  }
})