// pages/bookRoom/bookRoom.js
var hotel = require('../../utils/hotel.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList:[
      {
        roomType: "商务大床房",
        area: "25㎡",
        bedType: "大床",
        window: "有窗",
        breakfast: "含双早",
        internet: "WiFi",
        bathroom: "独立",
        peopleNum: "2人",
        楼层: "7-9层",
      },
      {
        roomType: "商务标间",
        area: "25㎡",
        bedType: "双床",
        window: "有窗",
        breakfast: "含双早",
        internet: "WiFi",
        bathroom: "独立",
        peopleNum: "2人",
        楼层: "7-9层",
      }
    ],
    albumUrl: [],
    bookDate: {
      checkInDate: '',
      checkOutDate: ''
    },
    currentDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this
    var currentDate = util.getCurrentDateYMD()
    var today = currentDate
    today.ymd = currentDate.year.toString() + '-' + currentDate.month.toString() + '-' + currentDate.day.toString()
    getApp().globalData.bookDate = util.dealBookDate(getApp().globalData.bookDate)
    that.setData({
      bookDate: getApp().globalData.bookDate,
      currentDate: today
    })
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

  toHotelAlbum: function () {
    wx.navigateTo({
      url: '../hotelAlbum/hotelAlbum',
    })
  },

  previewHotelAlbum: function () {
    wx.previewImage({
      current: '',
      urls: this.data.albumUrl
    })
  },

  toChooseDate: function () {
    wx.navigateTo({
      url: '../chooseDate/chooseDate',
    })
  }
})