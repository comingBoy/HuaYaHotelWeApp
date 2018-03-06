// pages/bookRoom/bookRoom.js
var hotel = require('../../utils/hotel.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList: [
      {
        album: [
          "../../images/businessBed1.jpg",
          "../../images/businessBed2.jpg",
          "../../images/businessBed3.jpg",
        ],
        facilities: [
          {
            name: "上网",
            value: "WIFI",
            main: true,
          },
          {
            name: "卫浴",
            value: "独立",
            main: true,
          },
          {
            name: "窗户",
            value: "有",
            main: true,
          },
          {
            name: "可住",
            value: "2人",
            main: true,
          },
          {
            name: "面积",
            value: "25㎡",
            main: false,
          },
          {
            name: "楼层",
            value: "7-9层",
            main: false,
          },
          {
            name: "床型",
            value: "大床1.8×2.0米1张",
            main: false,
          },
          {
            name: "早餐",
            value: "含两份早餐",
            main: false,
          },
        ],
        roomType: "商务大床房",
        area: "25㎡",
        bedType: "大床",
        window: "有窗",
        breakfast: "含双早",
        beChoosed: false,
      },
      {
        album: [
          "../../images/businessBed1.jpg",
          "../../images/businessBed2.jpg",
          "../../images/businessBed3.jpg",
        ],
        facilities: [
          {
            name: "面积",
            value: "25㎡",
            main: false,
          },
          {
            name: "床型",
            value: "单人床1.2x2.0米2张",
            main: false,
          },
          {
            name: "窗户",
            value: "有",
            main: true,
          },
          {
            name: "早餐",
            value: "含两份早餐",
            main: false,
          },
          {
            name: "上网",
            value: "WIFI",
            main: true,
          },
          {
            name: "卫浴",
            value: "独立",
            main: true,
          },
          {
            name: "可住",
            value: "2人",
            main: true,
          },
          {
            name: "楼层",
            value: "6-12层",
            main: false,
          },
        ],
        roomType: "商务标间",
        area: "25㎡",
        bedType: "双床",
        window: "有窗",
        breakfast: "含双早",
        beChoosed: false,
      }
    ],
    hiddenRoomDetail: true,
    roomBeShowed: null,
    roomDetail_hiddenRoomDetail: true,
    hotelAlbum: [],
    albumUrl: [],

    hotelLatitude: 32.7886000000,
    hotelLongitude: 118.0047200000

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
            hotelAlbum: res.hotelAlbum,
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

  previewHotelAlbum: function (e) {
    var index = e.currentTarget.id
    wx.previewImage({
      current: this.data.albumUrl[index],
      urls: this.data.albumUrl
    })
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
  }

})