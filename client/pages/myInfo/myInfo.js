// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hiddenMyBalance: true,
    hiddenMyCard: true,
    hiddenMyOrder: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
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
   * 弹窗函数
   */
  popUpWindow: function (hidden) {
    //第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,
      transformOrigin: '50% 100% 0'
    })

    //第2步：这个动画实例赋给当前动画实例
    this.animation = animation

    //第3步：执行第一组动画
    animation.opacity(0).scaleY(0).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationDate: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationDate: animation.export()
      })
    }.bind(this), 200)
    //导出打开界面数据
    this.setData(hidden)
  },
  /**
   * 关闭窗口函数
   */
  popDownWindow: function (hidden) {
    //第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,
      transformOrigin: '50% 100% 0'
    })

    //第2步：这个动画实例赋给当前动画实例
    this.animation = animation

    //第3步：执行第一组动画
    animation.opacity(0).scaleY(0).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationDate: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationDate: animation,
      })
      this.setData(hidden)
    }.bind(this), 200)

  },
  /**
   * 显示余额
   */
  showMyBalance: function () {
    var hidden = {
      hiddenMyBalance: false
    }
    this.popUpWindow(hidden)
  },
  /**
   * 隐藏余额
   */
  hiddenMyBalance: function () {
    var hidden = {
      hiddenMyBalance: true
    }
    this.popDownWindow(hidden)
  },
  /**
 * 显示订单
 */
  showMyOrder: function () {
    var hidden = {
      hiddenMyOrder: false
    }
    this.popUpWindow(hidden)
  },
  /**
   * 隐藏订单
   */
  hiddenMyOrder: function () {
    var hidden = {
      hiddenMyOrder: true
    }
    this.popDownWindow(hidden)
  },
  /**
  * 显示卡包
  */
  showMyCard: function () {
    var hidden = {
      hiddenMyCard: false
    }
    this.popUpWindow(hidden)
  },
  /**
   * 隐藏卡包
   */
  hiddenMyCard: function () {
    var hidden = {
      hiddenMyCard: true
    }
    this.popDownWindow(hidden)
  },
})