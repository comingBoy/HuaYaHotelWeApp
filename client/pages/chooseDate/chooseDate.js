// pages/chooseDate/chooseDate.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayList: ["日", "一", "二", "三", "四", "五", "六"],
    originDateRange: '',
    dateRange: '',
    bookDate: '',
    height: '',
    width: '',
    checkInDate: '',
    checkOutDate: '',
    choosedDate: '',
    choosedList: ["","入住","离店"],
    m: '',
    d: '',
    isFinish: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
    var i = startDate.year.toString() + '-' + startDate.month.toString()
    var j = endDate.year.toString() + '-' + endDate.month.toString()
    var monthStartDay = startDate.day
    do{
      var monthInfo = new Object()
      var ym = i.split("-")
      monthInfo.year = parseInt(ym[0])
      monthInfo.month = parseInt(ym[1])
      monthInfo.days = new Array()
      var thisMonth = monthInfo.year.toString() + '-' + monthInfo.month.toString()
      var nextMonth, nextYear
      var startDay = new Date(thisMonth + '-' + monthStartDay.toString())
      startDay = startDay.getDay()
      for (var k = 0; k < startDay; k ++) {
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
      var endDay = new Date(monthInfo.year.toString() + '-' + monthInfo.month.toString() + '-' + monthInfo.days[monthInfo.days.length - 1].day.toString())
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
      i = nextYear.toString() + '-' + nextMonth.toString()
    } while (thisMonth != j)

    var originDateRange = JSON.stringify(dateRange)
    originDateRange = JSON.parse(originDateRange)

    for (var l = 0; l < dateRange[0].days.length; l++) {
      if (dateRange[0].days[l].day != "") {
        var checkInDate = dateRange[0].year.toString() + '-' + dateRange[0].month.toString() + '-' + dateRange[0].days[l].day.toString()
        dateRange[0].days[l].choosed = 1
        dateRange[0].days[l].background = 1
        if (dateRange[0].days[l + 1].day == "") {
          for (var n = 0; n < dateRange[1].days.length; n++) {
            if (dateRange[1].days[n].day != "") {
              var checkOutDate = dateRange[1].year.toString() + '-' + dateRange[1].month.toString() + '-' + dateRange[1].days[n].day.toString()
              dateRange[1].days[n].choosed = 2
              dateRange[1].days[n].background = 1
              break
            }
          }
          break
        } else {
          var checkOutDate = dateRange[0].year.toString() + '-' + dateRange[0].month.toString() + '-' + dateRange[0].days[l + 1].day.toString()
          dateRange[0].days[l + 1].choosed = 2
          dateRange[0].days[l + 1].background = 1
          break
        }
      }
    }
    that.setData({
      originDateRange: originDateRange,
      dateRange: dateRange,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate
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

  chooseDate: function (e) {
    var that = this
    if (that.data.dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day != "") {
      var choosedDate = that.data.dateRange[e.currentTarget.dataset.m].year.toString() + '-' + that.data.dateRange[e.currentTarget.dataset.m].month.toString() + '-' + that.data.dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].day.toString()
      if (that.data.checkInDate != "" && that.data.checkOutDate != "") {
        var dateRange = JSON.stringify(that.data.originDateRange)
        dateRange = JSON.parse(dateRange)
        dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].choosed = 1
        dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].background = 1
        that.setData({
          dateRange: dateRange,
          checkInDate: choosedDate,
          checkOutDate: '',
          m: e.currentTarget.dataset.m,
          d: e.currentTarget.dataset.d,
          isFinish: false
        })
      } else {
        if (util.ifInOrder(that.data.checkInDate, choosedDate)) {
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
            } else if (m == e.currentTarget.dataset.m && m == that.data.m){
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
          that.setData({
            dateRange: dateRange,
            checkOutDate: choosedDate,
            isFinish: true
          })
        } else {
          var dateRange = JSON.stringify(that.data.originDateRange)
          dateRange = JSON.parse(dateRange)
          dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].choosed = 1
          dateRange[e.currentTarget.dataset.m].days[e.currentTarget.dataset.d].background = 1
          that.setData({
            dateRange: dateRange,
            checkInDate: choosedDate,
            m: e.currentTarget.dataset.m,
            d: e.currentTarget.dataset.d,
            isFinish: false
          })
        }
      }
    }
  },


  finishChoose: function () {
    var that = this
    var checkInDate = that.data.checkInDate.split('-')
    var checkOutDate = that.data.checkOutDate.split('-')
    getApp().globalData.bookDate = {
      checkInDate: {
        year: checkInDate[0],
        month: checkInDate[1],
        day: checkInDate[2],
        ymd: that.data.checkInDate
      },
      checkOutDate: {
        year: checkOutDate[0],
        month: checkOutDate[1],
        day: checkOutDate[2],
        ymd: that.data.checkOutDate
      }
    }
    wx.navigateBack({
      delta: 1
    })
  }

})