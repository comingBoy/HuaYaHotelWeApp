const roomTypedb = require('../db/roomTypedb.js')
const roomBookdb = require('../db/roomBookdb.js')
const roomBookedNumdb = require('../db/roomBookedNumdb.js')

module.exports = {

  //获取可预订房型
  getCanBookRoom: async ctx => {
    let req = ctx.request.body
    let res = await roomTypedb.get(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status
    }
  },
}