// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumUrl: [     "http://qcloudtest-1255391591.cn-south.myqcloud.com/1520262497305-BktD6R9uM.jpg",
    "http://qcloudtest-1255391591.cn-south.myqcloud.com/1520262501374-BJaDpAquf.jpg",
    "http://qcloudtest-1255391591.cn-south.myqcloud.com/1520694049803-BJ5QXOZKM.jpg"
    ],
    serviceList:[
      {
        name:"华亚大酒店",
        image: "../../images/hotelNo.png",
        buttonImg: "../../images/huaYaHotel.png",
        backgroundColor: "#855D4D",
        navigateTo: "../bookRoom/bookRoom",
      },
      {
        name:"摇麦KTV",
        image:"../../images/KTVNo.png",
        buttonImg: "../../images/yaoMaiKTV.png",
        backgroundColor: "#18C6B0",
        navigateTo: "../bookKTV/bookKTV",
      },
      {
        name:"酒席预定",
        image:"../../images/canting.png",
        buttonImg: "../../images/cantingBook.png",
        backgroundColor: "#46A5FC",
        navigateTo: "../bookFeast/bookFeast",
      }
    ]
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
   * 页面跳转函数
   */
  jumpTo: function(e){
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  }
})