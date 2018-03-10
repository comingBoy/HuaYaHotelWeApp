// pages/bookRoom/bookRoom.js
var hotel = require('../../utils/hotel.js')
var util = require('../../utils/util.js')
var book = require('../../utils/book.js')
var dateList = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ready: false,
    roomList: '',
    bookDate: {
      checkInDate: '',
      checkOutDate: ''
    },
    currentDate: '',
    hiddenRoomDetail: true,
    hiddenChooseDate: true,
    roomBeShowed: null,
    roomDetail_hiddenRoomDetail: true,
    hotelAlbum: [],
    albumUrl: [],
    hotelLatitude: 32.7886000000,
    hotelLongitude: 118.0047200000,
    dayList: ["日", "一", "二", "三", "四", "五", "六"],
    originDateRange: '',
    dateRange: '',
    height: '',
    width: '',
    choosedDate: '',
    choosedList: ["", "入住", "离店"],
    m: '',
    d: '',
    isFinish: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.showLoading({
      title: '载入中',
    })
    var that = this
    hotel.getHotelPic(function (res) {
      if (res.status == 1) {
        if (res.hotelAlbum.length > 0) {
          var albumUrl = new Array()
          for (var i = 0; i < res.hotelAlbum.length; i++) {
            albumUrl.push(res.hotelAlbum[i].picture)
          }
          that.setData({
            albumUrl: albumUrl
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '暂无图片！',
            showCancel: false,
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      } else if (res.status == -1) {
        util.showModel("提示", "获取失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })

    var currentDate = util.getCurrentDateYMD()
    var today = currentDate
    var bookDate = {
      checkInDate: util.getCurrentDateYMD(),
      checkOutDate: util.getNextdayDateYMD()
    }
    bookDate = util.dealBookDate(bookDate)
    dateList = util.getDateList(bookDate)

    that.getCanBookRoom(dateList)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth
        })
      }
    })

    var startDate = util.getCurrentDateYMD()
    var endDate = util.getEndDate()
    var dateRange = new Array()
    var i = startDate.year.toString() + '/' + startDate.month.toString()
    var j = endDate.year.toString() + '/' + endDate.month.toString()
    var monthStartDay = startDate.day
    do {
      var monthInfo = new Object()
      var ym = i.split("/")
      monthInfo.year = parseInt(ym[0])
      monthInfo.month = parseInt(ym[1])
      monthInfo.days = new Array()
      var thisMonth = monthInfo.year.toString() + '/' + monthInfo.month.toString()
      var nextMonth, nextYear
      var startDay = new Date(thisMonth + '/' + monthStartDay.toString())
      startDay = startDay.getDay()
      for (var k = 0; k < startDay; k++) {
        var tmp = {
          day: '',
          choosed: 0,
          background: 0
        }
        monthInfo.days.push(tmp)
      }
      var days = new Date(monthInfo.year, monthInfo.month, 0)
      days = days.getDate() - monthStartDay + 1
      if (monthInfo.month + 1 == 13) {
        nextMonth = 1
        nextYear = monthInfo.year + 1
      } else {
        nextMonth = monthInfo.month + 1
        nextYear = monthInfo.year
      }
      if (monthInfo.month != endDate.month) {
        for (var k = 0; k < days; k++) {
          var tmp = {
            day: k + monthStartDay,
            choosed: 0,
            background: 0
          }
          monthInfo.days.push(tmp)
        }
      } else {
        for (var k = 0; k < days; k++) {
          if (k <= endDate.day) {
            var tmp = {
              day: k + monthStartDay,
              choosed: 0,
              background: 0
            }
            monthInfo.days.push(tmp)
          } else {
            break
          }
        }
      }
      var endDay = new Date(monthInfo.year.toString() + '/' + monthInfo.month.toString() + '/' + monthInfo.days[monthInfo.days.length - 1].day.toString())
      endDay = 6 - endDay.getDay()
      for (var k = 0; k < endDay; k++) {
        var tmp = {
          day: '',
          choosed: 0,
          background: 0
        }
        monthInfo.days.push(tmp)
      }
      monthStartDay = 1
      dateRange.push(monthInfo)
      i = nextYear.toString() + '/' + nextMonth.toString()
    } while (thisMonth != j)

    var originDateRange = JSON.stringify(dateRange)
    originDateRange = JSON.parse(originDateRange)

    for (var l = 0; l < dateRange[0].days.length; l++) {
      if (dateRange[0].days[l].day != "") {
        dateRange[0].days[l].choosed = 1
        dateRange[0].days[l].background = 1
        if (dateRange[0].days[l + 1].day == "") {
          for (var n = 0; n < dateRange[1].days.length; n++) {
            if (dateRange[1].days[n].day != "") {
              dateRange[1].days[n].choosed = 2
              dateRange[1].days[n].background = 1
              break
            }
          }
          break
        } else {
          dateRange[0].days[l + 1].choosed = 2
          dateRange[0].days[l + 1].background = 1
          break
        }
      }
    }
    that.setData({
      originDateRange: originDateRange,
      dateRange: dateRange,
      bookDate: bookDate,
      currentDate: today
    })

  },

  //查询可预订房型接口
  getCanBookRoom: function (dateList) {
    var that = this
    var data = {
      dateList: dateList
    }
    book.getCanBookRoom(data, function (res) {
      if (res.status == 1) {
        var roomList = res.roomList
        for (var i = 0; i < roomList.length; i ++) {
          roomList[i].picture = JSON.parse(roomList[i].picture)
          roomList[i].facilities = JSON.parse(roomList[i].facilities)
        }
        that.setData({
          roomList: roomList
        })
      } else if (res.status == -1) {
        util.showModel("提示", "获取房型失败，请重试！")
      } else {
        util.showModel("提示", "请求出错！")
      }
    })
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

  previewHotelAlbum: function (e) {
    var index = e.currentTarget.id
    wx.previewImage({
      current: this.data.albumUrl[index],
      urls: this.data.albumUrl
    })
  },

  previewRoomAlbum: function (e) {
    var index = e.currentTarget.id
    wx.previewImage({
      current: this.data.roomBeShowed.picture[index],
      urls: this.data.roomBeShowed.picture
    })
  },

  toChooseDate: function () {
    wx.navigateTo({
      url: '../chooseDate/chooseDate',
    })
  },

  showChooseDate: function () {
    var hiddenChooseDate = false

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
      showChooseDateAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        showChooseDateAnimationData: animation
      })
    }.bind(this), 200)
    this.setData({
      hiddenChooseDate,
    })
  },

  hiddenChooseDate: function () {
    var hiddenChooseDate = true
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
      showChooseDateAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        showChooseDateAnimationData: animation
      })
      this.setData({
        hiddenChooseDate,
      })
    }.bind(this), 200)

    //重置住宿时间
    var that = this
    var dateRange = JSON.stringify(that.data.originDateRange)
    dateRange = JSON.parse(dateRange)
    for (var l = 0; l < dateRange[0].days.length; l++) {
      if (dateRange[0].days[l].day != "") {
        dateRange[0].days[l].choosed = 1
        dateRange[0].days[l].background = 1
        if (dateRange[0].days[l + 1].day == "") {
          for (var n = 0; n < dateRange[1].days.length; n++) {
            if (dateRange[1].days[n].day != "") {
              dateRange[1].days[n].choosed = 2
              dateRange[1].days[n].background = 1
              break
            }
          }
          break
        } else {
          dateRange[0].days[l + 1].choosed = 2
          dateRange[0].days[l + 1].background = 1
          break
        }
      }
    }
    var bookDate = {
      checkInDate: util.getCurrentDateYMD(),
      checkOutDate: util.getNextdayDateYMD()
    }
    bookDate = util.dealBookDate(bookDate)
    that.setData({
      bookDate: bookDate,
      dateRange: dateRange
    })
  },

  finishChooseDate: function () {
    var bookDate = this.data.bookDate
    dateList = util.getDateList(bookDate)
    this.getCanBookRoom(dateList)

    var hiddenChooseDate = true
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
      showChooseDateAnimationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        showChooseDateAnimationData: animation
      })
      this.setData({
        hiddenChooseDate,
      })
    }.bind(this), 200)
  },

  //选择住宿时间
  chooseDate: function (e) {
    var that = this
    if (that.data.dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day != "") {
      var choosedDate = that.data.dateRange[e.currentTarget.dataset.m].year.toString() + '/' + that.data.dateRange[e.currentTarget.dataset.m].month.toString() + '/' + that.data.dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day.toString()
      if (that.data.bookDate.checkInDate.ymd != "" && that.data.bookDate.checkOutDate.ymd != "") {
        var dateRange = JSON.stringify(that.data.originDateRange)
        dateRange = JSON.parse(dateRange)
        dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].choosed = 1
        dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].background = 1
        var bookDate = {
          checkInDate: {
            year: dateRange[e.currentTarget.dataset.m].year,
            month: dateRange[e.currentTarget.dataset.m].month,
            day: dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day,
            ymd: choosedDate
          },
          checkOutDate: {
            year: '',
            month: '',
            day: '',
            ymd: ''
          }
        }
        that.setData({
          dateRange: dateRange,
          bookDate: bookDate,
          m: e.currentTarget.dataset.m,
          d: e.currentTarget.dataset.d,
          isFinish: false
        })
      } else {
        if (util.ifInOrder(that.data.bookDate.checkInDate.ymd, choosedDate)) {
          var dateRange = that.data.dateRange
          dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].choosed = 2
          for (var m = that.data.m; m <= e.currentTarget.dataset.m; m++) {
            if (m < e.currentTarget.dataset.m && m == that.data.m) {
              for (var n = that.data.d; n < dateRange[m].days.length; n++) {
                if (dateRange[m].days[n].day != "") {
                  dateRange[m].days[n].background = 1
                }
              }
            } else if (m < e.currentTarget.dataset.m && m != that.data.m) {
              for (var n = 0; n < dateRange[m].days.length; n++) {
                if (dateRange[m].days[n].day != "") {
                  dateRange[m].days[n].background = 1
                }
              }
            } else if (m == e.currentTarget.dataset.m && m == that.data.m) {
              for (var n = that.data.d; n <= e.currentTarget.dataset.d; n++) {
                if (dateRange[m].days[n].day != "") {
                  dateRange[m].days[n].background = 1
                }
              }
            } else {
              for (var n = 0; n <= e.currentTarget.dataset.d; n++) {
                if (dateRange[m].days[n].day != "") {
                  dateRange[m].days[n].background = 1
                }
              }
            }
          }
          var bookDate = that.data.bookDate
          bookDate.checkOutDate = {
            year: dateRange[e.currentTarget.dataset.m].year,
            month: dateRange[e.currentTarget.dataset.m].month,
            day: dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day,
            ymd: choosedDate
          }
          that.setData({
            dateRange: dateRange,
            bookDate: bookDate,
            isFinish: true
          })
        } else {
          var dateRange = JSON.stringify(that.data.originDateRange)
          dateRange = JSON.parse(dateRange)
          dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].choosed = 1
          dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].background = 1
          var bookDate = {
            checkInDate: {
              year: dateRange[e.currentTarget.dataset.m].year,
              month: dateRange[e.currentTarget.dataset.m].month,
              day: dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day,
              ymd: choosedDate
            },
            checkOutDate: {
              year: '',
              month: '',
              day: '',
              ymd: ''
            }
          }
          that.setData({
            dateRange: dateRange,
            bookDate: bookDate,
            m: e.currentTarget.dataset.m,
            d: e.currentTarget.dataset.d,
            isFinish: false
          })
        }
      }
    }
  },

  //选择完成
  finishChoose: function () {
    var that = this
    var bookDate = {
      checkInDate: {
        year: that.data.bookDate.checkInDate.year,
        month: that.data.bookDate.checkInDate.month,
        day: that.data.bookDate.checkInDate.day,
        ymd: that.data.bookDate.checkInDate.ymd
      },
      checkOutDate: {
        year: that.data.bookDate.checkOutDate.year,
        month: that.data.bookDate.checkOutDate.month,
        day: that.data.bookDate.checkOutDate.day,
        ymd: that.data.bookDate.checkOutDate.ymd
      }
    }
    bookDate = util.dealBookDate(bookDate)
    that.setData({
      bookDate: bookDate
    })
    that.finishChooseDate()
  },

  /**
   * 开始点击房间列表
   */
  touchRoomStart: function (e) {
    var index = e.currentTarget.id
    var roomList = this.data.roomList
    roomList[index].beChoosed = true
    this.setData({
      roomList: roomList
    })
  },
  /**
   * 点击房间列表动作结束
   */
  touchRoomEnd: function (e) {
    var index = e.currentTarget.id
    var roomList = this.data.roomList
    roomList[index].beChoosed = false
    this.setData({
      roomList: roomList
    })
  },
  /**
   * 点击房间列表后移动
   */
  touchRoomMove: function (e) {
    var index = e.currentTarget.id
    var roomList = this.data.roomList
    roomList[index].beChoosed = false
    this.setData({
      roomList: roomList
    })
  },
  /**
   * 点击查看房间详情
   */
  showRoomDetail: function (e) {
    var index = e.currentTarget.id
    var roomBeShowed = this.data.roomList[index]
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
   *打开导航
   */
  openMap: function () {
    wx.openLocation({
      latitude: this.data.hotelLatitude,
      longitude: this.data.hotelLongitude,
      name: "华亚大酒店",
      address: "明光市体育路133号",
      scale: 28
    })
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
   * 跳转到酒店详情
   */
  enterHotelDetail: function (e) {
    wx.navigateTo({
      url: '../hotelDetail/hotelDetail',
    })
  },
  /**
   * 跳转到预订界面
   */
  toSubmitOrder: function (e) {
    var roomList = this.data.roomList
    var src = e.currentTarget.dataset.src
    var room
    var index
    getApp().globalData.dateList = dateList
    if (src == 'in') {
      room = this.data.roomBeShowed
    } else if (src == 'out') {
      index = e.currentTarget.dataset.index
      room = roomList[index]
    }
    getApp().globalData.room = room
    getApp().globalData.bookDate = this.data.bookDate
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
    })
  }

})