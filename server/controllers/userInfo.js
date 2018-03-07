const userdb = require('../db/userdb.js')

module.exports = {
  getUserInfo: async ctx => {
    let req = ctx.request.body
    let res = await userdb.getUserByOpenId(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      userInfo: res
    }
  },

  newUser: async ctx => {
    var req = ctx.request.body
    var res = await userdb.newUser(req)
    var status
    if (typeof (res) == 'object') {
      res = await userdb.getUserByOpenId(req)
      status = typeof (res) == 'object' ? 1 : 0
    } else {
      status = -1
    }
    ctx.body = {
      status: status,
      userInfo: res
    }
  },
}