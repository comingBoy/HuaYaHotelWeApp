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
          res0 = await roomBookedNumdb.getBookedNum(res[i], req.dateList[j])
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
}