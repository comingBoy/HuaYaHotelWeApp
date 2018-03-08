const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

var getCurrentDateYMD = function () {
  var myDate = new Date()
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  var ymd = year.toString() + '-' + month.toString() + '-' + day.toString()
  return {year,  month, day, ymd}
}

var getYesterdayDateYMD = function () {
  var myDate = new Date()
  myDate.setTime(myDate.getTime() - 24 * 60 * 60 * 1000);
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  year = year.toString()
  month = month < 10 ? '0' + month : month.toString()
  day = day < 10 ? '0' + day : day.toString()
  return year + '-' + month + '-' + day
}

var getNextdayDateYMD = function () {
  var myDate = new Date()
  myDate.setTime(myDate.getTime() + 24 * 60 * 60 * 1000);
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  var ymd = year.toString() + '-' + month.toString() + '-' + day.toString()
  return { year, month, day, ymd }
}

var getCurrentTimeHM = function () {
  var myDate = new Date()
  var hours = myDate.getHours() //获取当前小时数(0-23)
  var min = myDate.getMinutes() //获取当前分钟数(0-59)
  hours = hours < 10 ? '0' + hours : hours.toString()
  min = min < 10 ? '0' + min : min.toString()
  return hours + ':' + min
}

var getManyDays = function (bookDate) {
  var checkInDate = bookDate.checkInDate.ymd
  var checkOutDate = bookDate.checkOutDate.ymd
  checkInDate = new Date(checkInDate)
  checkOutDate = new Date(checkOutDate)
  var manyDays = parseInt((checkOutDate - checkInDate) / (24 * 60 * 60 * 1000))
  //manyDays = this.NumberToChinese(manyDays)
  return manyDays
}

var getWhatDay = function (date) {
  var tagList = ["今天","明天","后天"]
  var today = this.getCurrentDateYMD()
  today = new Date(today.year.toString() + '-' + today.month.toString() + '-' + today.day.toString()) 
  var date = new Date(date)
  var manyDays = parseInt((date - today) / (24 * 60 * 60 * 1000))
  if (manyDays > 2) {
    return "星期" + "日一二三四五六".charAt(date.getDay())
  } else {
    return tagList[manyDays]
  }
}

function SectionToChinese(section) {
  var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  var chnUnitChar = ["", "十", "百", "千"]
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

function NumberToChinese(num) {
  var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"]
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;
  if (num === 0) {
    return chnNumChar[0];
  }
  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = this.SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }
  return chnStr;
}

function dealBookDate (bookDate) {
  var bookDate = bookDate
  bookDate.manyDays = this.getManyDays(bookDate)
  bookDate.checkInDate.whatDay = this.getWhatDay(bookDate.checkInDate.ymd)
  bookDate.checkOutDate.whatDay = this.getWhatDay(bookDate.checkOutDate.ymd)
  return bookDate
  
}

var getEndDate = function () {
  var myDate = new Date()
  myDate.setTime(myDate.getTime() + 60 * 24 * 60 * 60 * 1000);
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  var ymd = year.toString() + '-' + month.toString() + '-' + day.toString()
  return { year, month, day, ymd}
}

var ifInOrder = function (date1, date2) {
  var date1 = new Date(date1)
  var date2 = new Date(date2)
  return date2 - date1 > 0 ? true : false
}

var getDateList = function (bookDate) {
  var startDate = bookDate.checkInDate.ymd
  var endDate = bookDate.checkOutDate.ymd
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  var manyDays = parseInt((endDate - startDate) / (24 * 60 * 60 * 1000))
  var dateList = new Array()
  var midDay
  for (var i = 0; i < manyDays; i ++) {
    midDay =new Date (startDate.getTime() + 24 * 60 * 60 * 1000 * i)
    dateList.push(midDay.getFullYear().toString() + '-' + (midDay.getMonth() + 1).toString() + '-' + midDay.getDate().toString())
  }
  return dateList
}


module.exports = { 
  formatTime, 
  showBusy, 
  showSuccess, 
  showModel, 
  getCurrentDateYMD, 
  getYesterdayDateYMD, 
  getNextdayDateYMD, 
  getCurrentTimeHM, 
  getManyDays, 
  getWhatDay, 
  SectionToChinese, 
  NumberToChinese, 
  dealBookDate, 
  getEndDate, 
  ifInOrder, 
  getDateList
}
