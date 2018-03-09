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
    canBookNum: [],
    roomIndex: 0,
    customerName: ["每间需要填写一人姓名"],
    tell: "用于接受通知",
    timeNum: ['18:00之前', '20:00之前', '23:59之前', '次日6：00之前'],
    timeIndex: 0,

    hiddenOrderDetail: true,
    hiddenRoomDetail: true,
    roomBeShowed: null,
    roomDetail_hiddenRoomDetail: true,
    dateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dateList = getApp().globalData.dateList
    for (var i = 0; i < dateList.length; i ++) {
      dateList[i] = dateList[i].split('/')
    }
    

    this.setData({
      room: getApp().globalData.room,
      bookDate: getApp().globalData.bookDate,
      dateList: dateList
    })
    if (this.data.room.canBookNum < 10) {
      var roomNum = this.data.roomNum.slice(0, this.data.room.canBookNum)
      this.setData({
        canBookNum: roomNum
      })
    } else {
      var roomNum = this.data.roomNum
      this.setData({
        canBookNum: roomNum
      })
    }
    console.log(this.data.canBookNum)
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

  },
  /**
   * 房间数选择
   */
  chooseRoomNum: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num1 = parseInt(e.detail.value) + 1
    var customerNameArray = new Array(num1)
    for (var i = 0; i < customerNameArray.length; i++) {
      customerNameArray[i] = "每间需要填写一人姓名"
    }
    console.log(customerNameArray)
    this.setData({
      roomIndex: num1 - 1,
      customerName: customerNameArray
    })
  },
  /**
   * 输入房间入住人
   */
  enterNmae: function (e) {
    console.log(e.currentTarget.id)
    var customerNameArray = this.data.customerName
    console.log(customerNameArray.length)
    customerNameArray[e.currentTarget.id] = e.detail.value
    console.log(customerNameArray.length)
    this.setData({
      customerName: customerNameArray
    })
    console.log(customerNameArray.length)
  },
  /**
   * 输入联系电话
   */
  enterTell: function (e) {
    this.setData({
      tell: e.detail.value
    })
    console.log(this.data.tell)
  },
  /**
   * 预计到达时间按选择
   */
  chooseTime: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },

  /**
   * 打开房间详情界面
   */
  showRoomDetail: function (e) {
    var roomBeShowed = this.data.room
    var hiddenRoomDetail = false

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
      showRoomDetailAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        showRoomDetailAnimationData: animation
      })
    }.bind(this), 200)
    this.setData({
      roomBeShowed,
      hiddenRoomDetail,
    })
  },
  /**
   * 隐藏房间详情界面
   */
  hiddenRoomDetail: function () {
    var hiddenRoomDetail = true
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
      showRoomDetailAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        showRoomDetailAnimationData: animation
      })
      this.setData({
        hiddenRoomDetail,
        roomDetail_hiddenRoomDetail: true,
      })
    }.bind(this), 200)
  },
  /**
  * 显示更多设施
  */
  showMore: function (e) {
    this.setData({
      roomDetail_hiddenRoomDetail: false,
    })
  },
  /**
   * 显示订单明细
   */
  openOrderDetail: function () {
    console.log(1111111)
    var hiddenOrderDetail = !this.data.hiddenOrderDetail

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
      hiddenOrderDetailAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        hiddenOrderDetailAnimationData: animation
      })
      if (hiddenOrderDetail) {
        this.setData({
          hiddenOrderDetail
        })
      }
    }.bind(this), 200)
    if (!hiddenOrderDetail) {
      this.setData({
        hiddenOrderDetail
      })
    }

  },

  hiddenOrderDetail: function () {
    var hiddenOrderDetail = true
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
      hiddenOrderDetailAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        hiddenOrderDetailAnimationData: animation
      })
      this.setData({
        hiddenOrderDetail,
      })
    }.bind(this), 200)
  }
})