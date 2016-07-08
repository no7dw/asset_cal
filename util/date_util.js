'use strict'

const moment = require('moment');

module.exports = {
  /**
   *
   * @param currentTime 当前的时间
   * @param addday 是否加减日期
   * @returns {number}返回的是当日零点的时间戳
   */
  getDate: function (currentTime, addDay, isSetZero) {
    if (currentTime == undefined)
      currentTime = new Date();
    let today = new Date();
    if (addDay != undefined) {
      today.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + addDay);
    } else {
      today.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    }
    if(isSetZero) today.setHours(0, 0, 0, 0);
    return today.getTime();
  },
  formatTime: function (currentTime, formatStr) {
    let time = currentTime || new Date();
    let format = formatStr || '';
    return moment(time).format(format);
  },
  /**
   * 计算两个日期相差的天数
   * @param start_time
   * @param end_time  默认是当前时间
   * @param type  默认是 天
   * @returns {*}
   */
  diff: function (start_time, end_time, type) {
    let start = moment(start_time);
    let end = moment(end_time || new Date());
    let day = end.diff(start, type||'days');
    return day;
  },
  /**
   *
   * @param currentTime 时间
   * @returns {number}返回的是输入时间零点的时间戳
   */
  formatTimeToZeroTime : function (time) {
    if('object' == (typeof time)){
      time = time + '';
      time = new Date(time);
    }
    else if('string' == (typeof time)){
      time = new Date(time);
    }
    time = this.formatTime(time,  'YYYY/MM/DD');
    time = new Date(time).getTime();
    return time;
  }
};

