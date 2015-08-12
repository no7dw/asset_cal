var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;

var ms = require('ms');
/**
 * Created by dengwei on 12/8/15.
 */
function timeDeposit(rateArray){
  EventEmitter.call(this);
}
inherits(timeDeposit, EventEmitter);
/**
 * 计算单个asset收益
 * @param 单个asset
 * @return 收益
 */
timeDeposit.prototype.cal = function(asset,  time){

  var isSetZeroTime = true;
  var SpecCalTime = time || date_util.getDate(null, 0, isSetZeroTime);

  if(SpecCalTime < asset.end_time )//未到期
  {
    console.log('%% time not right , may expired' , asset.end_time, SpecCalTime);
    return 0;
  }
  else if(SpecCalTime == asset.end_time){
    console.log('%% time ok , cal now');
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    return assetDailyReturn  = (asset.rate) * (asset.amount|| asset.num) / 365 * periodDay;
  }
  console.log('end not match any case');
  return 0;
};
/**
 * 获取预期收益
 * @param asset
 * @param 开始时间
 * @return 结束时间
 */
timeDeposit.prototype.expectedTimeRevenue = function(asset, start_time, end_time, period){
  var revenue = {total:0, expectlist:[]}
  for(var time = start_time; time>=end_time; time+=period){
    periodRevenue = this.cal(asset, time);
    var time_value_list ={
      time:time,
      periodRevenue:periodRevenue
    };
    revenue.total += periodRevenue;
    revenue.push(time_value_list);
  }
  return revenue;
};
exports.timeDeposit = timeDeposit;
