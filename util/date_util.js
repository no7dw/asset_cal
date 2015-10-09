
var moment = require('moment');

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
    var today = new Date();
    if (addDay != undefined) {
      today.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + addDay);
    } else {
      today.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    }
    if(isSetZero) today.setHours(0, 0, 0, 0);
    return today.getTime();
  },
  formatTime: function (currentTime, formatStr) {
    var time = currentTime || new Date();
    var format = formatStr || '';
    return moment(time).format(format);
  },
  /**
   *
   * @param currentTime 时间
   * @returns {number}返回的是输入时间零点的时间戳
   */
  formatTimeToZeroTime : function (time) {
    if('object' == (typeof time))
      time = time + '';
    time = this.formatTime(time,  'YYYY/MM/DD');
    time = new Date(time).getTime();
    return time;
  }
};

