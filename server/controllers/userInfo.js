const userdb = require('../db/userdb.js')
const contactdb = require('../db/contactdb.js')

module.exports = {

  /**
   * 获取用户信息
   */
  getUserInfo: async ctx => {
    let req = ctx.request.body
    let res = await userdb.getUserByOpenId(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      userInfo: res
    }
  },

  /**
   * 新建用户信息
   */
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

  /**
   * 获取联系人
   */
  getContact: async ctx => {
    var req = ctx.request.body
    var res = await contactdb.getContact(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      contact: res
    }
  },

  /**
   * 新建联系人
   */
  newContact: async ctx => {
    var req = ctx.request.body
    var res = await contactdb.newContact(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status
    }
  },

  /**
   * 删除联系人
   */
  newContact: async ctx => {
    var req = ctx.request.body
    var res = await contactdb.delContact(req)
    var status = typeof (res) == 'object' ? 1 : -1
    ctx.body = {
      status: status
    }
  },
}