  // pages/submitOrder/submitOrder.js
var util = require('../../utils/util.js')
var book = require('../../utils/book.js')
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
    customerName: ["请填写入住人姓名"],
    tell: '',
    timeNum: ['18:00之前', '20:00之前', '23:59之前', '次日6：00之前'],
    timeIndex: 0,
    chooseCustomer: true,
    hiddenOrderDetail: true,
    hiddenRoomDetail: true,
    roomBeShowed: null,
    roomDetail_hiddenRoomDetail: true,
    dateList: [],
    contact: [],
    bookRoom: {
      userId: '',
      contactId: [],
      roomTypeId: '',
      bookRoomNum: '',
      totalPrice: '',
      checkInDate: '',
      checkOutDate: '',
      comeTime: '',
      ifFinish: 0,
      userDelete: 0
    },
    unknownContact: [],
    contactIdList: [],
    contactIndex: [0],
    contactId: [],
    ready:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '载入中',
    })
    var dateList = JSON.stringify(getApp().globalData.dateList)
    dateList = JSON.parse(dateList)
    for (var i = 0; i < dateList.length; i++) {
      dateList[i] = dateList[i].split('/')
    }

    this.getContact()

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
    wx.hideLoading()
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

  },
  /**
   * 房间数选择
   */
  chooseRoomNum: function (e) {
    var num1 = parseInt(e.detail.value) + 1
    var customerNameArray = this.data.customerName
    var contactIndex = this.data.contactIndex
    var num2 = customerNameArray.length
    if (num1 >= num2) {
      for (var i = 0; i < num1 - num2; i++) {
        customerNameArray.push("请填写入住人姓名")
        contactIndex.push(0)
      }
    } else {
      for (var i = 0; i < num2 - num1; i++) {
        customerNameArray.pop()
        contactIndex.pop()
      }
    }
    this.setData({
      roomIndex: num1 - 1,
      customerName: customerNameArray,
      contactIndex: contactIndex
    })
  },
  /**
   * 输入房间入住人
   */
  enterName: function (e) {
    var customerName = this.data.customerName
    var contactIndex = this.data.contactIndex
    var tell = this.data.tell
    var contact = this.data.contact
    if (contactIndex[e.currentTarget.id] > 0) {
      contactIndex[e.currentTarget.id] = 0
      customerName[e.currentTarget.id] = ''
      if (e.currentTarget.id == 0) tell = ''
      contact[e.currentTarget.id].choosed = false
      this.setData({
        contactIndex: contactIndex,
        customerName: customerName,
        tell: tell,
        contact: contact
      })
    } else {
      if (e.detail.value == '') {
        customerName[e.currentTarget.id] = e.detail.value
        contactIndex[e.currentTarget.id] = 0
        this.setData({
          contactIndex: contactIndex,
          customerName: customerName
        })
      } else {
        customerName[e.currentTarget.id] = e.detail.value
        contactIndex[e.currentTarget.id] = -1
        this.setData({
          contactIndex: contactIndex,
          customerName: customerName
        })
      }
    }
  },
  /**
   * 输入联系电话
   */
  enterTell: function (e) {
    this.setData({
      tell: e.detail.value
    })
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
  },

  /**
   * 获取联系人信息
   */
  getContact: function () {
    var that = this
    var data = {
      userId: getApp().globalData.userInfo.userId
    }
    book.getContact(data, function (res) {
      if (res.status == 1) {
        var contactId = new Array()
        var contact = res.contact
        if (contact.length > 0) {
          for (var i = 0; i < contact.length; i++) {
            contact[i].choosed = false
            contactId.push(contact[i].contactId)
          }
        }
        that.setData({
          contact: contact
        })
      } else if (res.status == -1) {
        util.showModel("提示", "获取联系人失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
  },




  /**
   * 选择联系人界面控制
   */
  chooseCustomer: function () {

    var chooseCustomer = false

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
      chooseCustomer,
    })
  },

  hiddenChooseCustomer: function () {
    var chooseCustomer = true
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
        chooseCustomer,

      })
    }.bind(this), 200)
  },

  /**
   * 选择已有联系人
   */
  chooseCustomerImg: function (e) {
    var contact = this.data.contact
    var contactIndex = this.data.contactIndex
    var choosedNum = 1
    var customerName = this.data.customerName
    var tell = this.data.tell
    var contactId = this.data.contactIndex
    if (contact[e.currentTarget.id].choosed == false) {
      for (var i = 0; i < contactId.length; i++) {
        if (contactId[i] != 0) choosedNum++
      }
      if (choosedNum <= this.data.roomIndex + 1) {
        contact[e.currentTarget.id].choosed = !contact[e.currentTarget.id].choosed
        for (var j = 0; j < customerName.length; j++) {
          if (customerName[j] == '' || customerName[j] == "请填写入住人姓名") {
            if (j == 0 && contact[e.currentTarget.id].contactTel != 'null') tell = contact[e.currentTarget.id].contactTel
            contactIndex[j] = contact[e.currentTarget.id].contactId
            customerName[j] = contact[e.currentTarget.id].contactName
            this.setData({
              contact: contact,
              contactIndex: contactIndex,
              customerName: customerName,
              tell: tell
            })
            break
          }
        }
      } else {
        util.showModel("提示", "不能超过房间数！")
      }
    } else {
      contact[e.currentTarget.id].choosed = !contact[e.currentTarget.id].choosed
      var index = contactIndex.indexOf(contact[e.currentTarget.id].contactId)
      contactIndex[index] = 0
      customerName[index] = "请填写入住人姓名"
      var tell = this.data.tell
      if (index == 0) tell = ''
      this.setData({
        contact: contact,
        contactIndex: contactIndex,
        customerName: customerName,
        tell: tell
      })
    }
  },

  /**
   * 预订房间
   */
  bookRoom: function () {
    var that = this
    var roomBook
    var contactIndex = this.data.contactIndex
    var customerName = this.data.customerName
    var data
    var userId = getApp().globalData.userInfo.userId
    var contactTel = this.data.tell
    var contactId = this.data.contactId
    var contact = this.data.contact

    if (contactIndex.indexOf(0) != -1) {
      util.showModel("提示", "请填写所有入住人姓名！")
    } else {
      var regx = /\d+/;
      for(var i=0;i < customerName.length;i++){
        if (regx.test(customerName[i])){
          util.showModel("提示","请输入正确的姓名！")
        } else if (i == customerName.length - 1 && !regx.test(customerName[i])){
          for (var i = 0; i < contactIndex.length; i++) {
            if (contactIndex[i] == -1 && i == 0) {
              data = {
                contactName: customerName[i],
                userId: userId,
                contactTel: contactTel
              }
              book.newContact(data, function (res) {
                if (res.status == 1) {
                  contactIndex[i] = res.contact[0].contactId
                } else if (res.status == -1) {
                  util.showModel("提示", "新建联系人失败，请重试！")
                } else {
                  util.showModel("提示", "请求出错！")
                }
              })
            } else if (contactIndex[i] == -1 && i > 0) {
              data = {
                contactName: customerName[i],
                userId: userId,
                contactTel: 'null'
              }
              book.newContact(data, function (res) {
                if (res.status == 1) {
                  contactIndex[i] = res.contact[0].contactId
                } else if (res.status == -1) {
                  util.showModel("提示", "新建联系人失败，请重试！")
                } else {
                  util.showModel("提示", "请求出错！")
                }
              })
            } else if (contactIndex[i] != -1 && i == 0) {
              data = {
                contactId: contactIndex[i],
                contactTel: contactTel
              }
              book.modifyContact(data, function (res) {
                if (res.status == 1) {
                } else if (res.status == -1) {
                  util.showModel("提示", "修改联系人失败，请重试！")
                } else {
                  util.showModel("提示", "请求出错！")
                }
              })
            }
          }
          var contactName = JSON.stringify(customerName)
          roomBook = {
            userId: userId,
            contactName: contactName,
            roomTypeId: that.data.room.roomTypeId,
            bookRoomNum: that.data.roomIndex + 1,
            totalPrice: that.data.room.price * that.data.bookDate.manyDays * (that.data.roomIndex + 1),
            checkInDate: that.data.bookDate.checkInDate.ymd,
            checkOutDate: that.data.bookDate.checkOutDate.ymd,
            comeTime: that.data.timeNum[that.data.timeIndex],
            bookTel: contactTel,
            ifFinish: 0,
            userDelete: 0
          }

          data = {
            roomBook: roomBook,
            dateList: getApp().globalData.dateList
          }
          book.newRoomBook(data, function (res) {
            console.log(res)
            if (res.status == 1) {
              wx.navigateTo({
                url: '../successOrder/successOrder',
              })
              //显示预定成功
            } else if (res.status == -1) {
              util.showModel("提示", "预订失败，请重试！")
            } else if (res.status == 0) {
              util.showModel("提示", "数据库异常！")
            } else {
              util.showModel("提示", "请求出错！")
            }
          })
        }
      } 
    }
  }
})