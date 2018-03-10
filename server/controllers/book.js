const roomTypedb = require('../db/roomTypedb.js')
const roomBookdb = require('../db/roomBookdb.js')
const roomBookedNumdb = require('../db/roomBookedNumdb.js')


module.exports = {

  //获取可预订房型
  getCanBookRoom: async ctx => {
    var req = ctx.request.body
    var res = await roomTypedb.getAllRoomType()
    var roomList = res
    var res0
    if (typeof(res) == 'object' && res.length > 0) {
      status = 1
      for (var i = 0; i < roomList.length; i ++) {
        roomList[i].canBookNum = roomList[i].totalRoomNum
        for (var j = 0; j < req.dateList.length; j ++) {
          res0 = await roomBookedNumdb.getRoomBookedNum(res[i], req.dateList[j])
          if (typeof(res0) == 'object' && res0.length > 0) {
            if (roomList[i].totalRoomNum - res0[0].bookedNum < roomList[i].canBookNum) {
              roomList[i].canBookNum = roomList[i].totalRoomNum - res0[0].bookedNum
            }
          } else if (typeof (res0) != 'object') {
            status = -1
            break
          }
        }
        if (status == -1) {
          break
        }
      }
    } else if (typeof (res) == 'object' && res.length == 0) {
      roomList = []
      status = 0
    } else {
      status = -1
    }

    ctx.body = {
      status: status,
      roomList: roomList
    }
  },

  //获取我的住宿订单
  getMyRoomBook: async ctx => {
    let req = ctx.request.body
    let res = await roomBookdb.getMyRoomBook(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      MyRoomBook: res
    }
  },

  //删除我的住宿订单
  delMyRoomBook: async ctx => {
    let req = ctx.request.body
    let res = await roomBookdb.delMyRoomBook(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
    }
  },

  //取消我的住宿订单
  cancelMyRoomBook: async ctx => {
    var req = ctx.request.body
    var res, res0, status, bookedNum, req0
    status = 1
    for (var i = 0; i < req.dateList.length; i ++) {
      req0 = {
        date: req.dateList[i],
        roomTypeId: req.roomBook.roomTypeId
      }
      res0 = await roomBookedNumdb.getRoomBookedNum(req0)
      if (typeof (res0) == 'object') {
        bookedNum = res0[0].bookedNum - req.roomBook.bookRoomNum
        req0 = {
          roomBookedNumId: res0[0].roomBookedNumId,
          bookedNum: bookedNum
        }
        res0 = await roomBookdb.modifyMyRoomBook(req0)
        if (typeof (res0) != 'object') {
          status = 0
          break
        }
      } else  {
        status = -1
        break
      }
    }
  
    ctx.body = {
      status: status,
    }
  },

  //新建住宿订单
  newRoomBook: async ctx => {
    var req = ctx.request.body
    var res = await roomBookdb.newRoomBook(req.roomBook)
    var status = 1
    var req0, res0, bookedNum
    if (typeof(res) == 'object') {
      for (var i = 0; i < req.dateList.length; i++) {
        req0 = {
          date: req.dateList[i],
          roomTypeId: req.roomBook.roomTypeId
        }
        res0 = await roomBookedNumdb.getRoomBookedNum(req0)
        if (typeof (res0) == 'object') {
          if (res0.length > 0) {
            bookedNum = res0[0].bookedNum + req.roomBook.bookRoomNum
            req0 = {
              roomBookedNumId: res0[0].roomBookedNumId,
              bookedNum: bookedNum
            }
            res0 = await roomBookedNumdb.modifyRoomBookedNum(req0)
            if (typeof (res0) != 'object') {
              status = 0
              break
            }
          } else {
            req0 = {
              roomTypeId: req.roomBook.roomTypeId,
              date: req.roomBook.checkInDate,
              bookedNum: req.roomBook.bookRoomNum
            }
            res0 = await roomBookedNumdb.newRoomBookedNum(req0)
            if (typeof (res0) != 'object') {
              status = 0
              break
            }
          }
          
        } else {
          status = -1
          break
        }
      }
    } else {
      status = -1
    }

    ctx.body = {
      status: status,
    }
  },
}