// asset.js
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;

var mathjs = require('mathjs');
var _ = require('underscore');
var date_util = require('../util/date_util');

function Asset() {
  EventEmitter.call(this);
  //this.rateConfig = rateArray || [];
  //console.log("Asset init config");
}

inherits(Asset, EventEmitter);
/**
 * 计算单个asset收益
 * @param 单个asset
 * @return 收益
 */
Asset.prototype.cal = function (asset, time) {
  console.log('asset', asset);
  var isSetZeroTime = true;
  var SpecCalTime = time || date_util.getDate(null, 0, isSetZeroTime);
  if (!asset.rate)
    return 0;
  // rule is:  ( ]
  // example : ( 9  16]  10 11 12 13 14 15 16
  var verifyOutOfDate = true;
  if(asset.type == 4)//ex_money
    verifyOutOfDate = SpecCalTime > asset.end_time || SpecCalTime <= asset.start_time;
  else //if(asset.type == 2)//default demandDeposit -- NEVER EXPIRED
    verifyOutOfDate = false ;

  // rule is:  ( ]
  // example : ( 9  16]  10 11 12 13 14 15 16
  if (verifyOutOfDate)//may undefined
  {
    console.log('$$$ time not right , may expired', asset.end_time, SpecCalTime);
    return 0;
  }
  if(asset.amount<1)//份额小于1 不计算
    return 0;

  if (!asset.bonus_type || asset.bonus_type == 'ex_money') {
    //return assetDailyReturn  = (asset.rateYear||this.rateConfig[CalTime]) * asset.num / 365;
    var assetDailyReturn = (asset.rate) * (asset.num || asset.amount) / 365;
    console.log('time ok , cal now Return:', assetDailyReturn);
    return assetDailyReturn;
  }
  return 0;
};
/**
 * 获取预期收益
 * @param asset
 * @param 开始时间
 * @return 结束时间
 */
Asset.prototype.expectedTimeRevenue = function (asset, start_time, end_time, period) {
  var revenue = {total: 0, expectlist: []}
  for (var time = start_time; time >= end_time; time += period) {
    periodRevenue = this.cal(asset, time);
    var time_value_list = {
      time: time,
      periodRevenue: periodRevenue
    }
    revenue.total += periodRevenue;
    revenue.push(time_value_list);
  }
  return revenue;
};
/**
 * 计算收益
 * @param 产品数组
 * @param cb
 * @return
 */
Asset.prototype.calArray = function (assetArray, cb) {
  if (!(assetArray && assetArray.length))
    return 0;
  var self = this;
  var array = _.map(assetArray, function (item, index) {
    return self.cal(item);
  });
  console.log('$$ array to sum', array);
  return mathjs.sum(array)
};
/**
 * 获取所有预期收益
 * @param 产品数组
 * @param cb
 * @return
 */
Asset.prototype.getAllProfit = function (assetArray, cb) {
  return _.map(assetArray, this.cal) //need cal according time
};

exports.Asset = Asset;
