'use strict'

const mathjs = require('mathjs');
const _ = require('underscore');
const date_util = require('../util/date_util');
const ms = require('ms');
const moment = require('moment');
const FixIncome = require('./fixIncome');
/**
 * Created by dengwei on 12/8/15.
 */
// class timeDeposit extends FixIncome{
class timeDeposit {  
  constructor(){

  }
  
  // let assetSample = {
  //   amount: 10000,
  //   num: 10000,
  //   start_time: new Date('2015/7/12').getTime(),//1436630400000
  //   end_time: new Date('2015/8/11').getTime(),//1439222400000,
  //   blockPeriod: 15,
  //   rate: 0.1,
  //   discountRate: 0.3,
  //   withdrawAhead: true//封闭期后提前取出
  // };

  /**
   * 计算单个asset收益
   * @param 单个asset
   * @return 收益
   */
  cal(asset, time) {
    // if(-1 == super.check(asset))
    //   return 0;
    if(typeof asset != 'object')
      return 0
    if(asset.amount<1)//份额小于1 不计算
      return 0
    asset.start_time = date_util.formatTimeToZeroTime(asset.start_time);
    asset.end_time = date_util.formatTimeToZeroTime(asset.end_time);
    let isSetZeroTime = true;
    let SpecCalTime = date_util.formatTimeToZeroTime(time) || date_util.getDate(null, 0, isSetZeroTime);
    let blockTime = asset.start_time + asset.blockPeriod * ms('1d');
    console.log('timeDeposit ready SpecCalTime', SpecCalTime, "start_time",asset.start_time, "end_time", asset.end_time);
    if (SpecCalTime < blockTime)//未到期
    {
      console.log('%% timeDeposit time not right , may expired', asset.end_time, SpecCalTime, blockTime);
      return 0;
    }
    else if (SpecCalTime == asset.end_time) {//到期,计算收益, 复利的话要求start_time 会update

      let periodDay = date_util.diff(asset.start_time,asset.end_time, 'day');
      console.log('%% timeDeposit time ok , cal now');
      let assetDailyReturn = (asset.rate) * (asset.num || asset.amount) / 365 * periodDay;
      return assetDailyReturn;
    }
    //note:可用不用了。 withdrawAhead 提前提现标志
    //else if (SpecCalTime >= asset.start_time + asset.blockPeriod * ms('1d') && asset.withdrawAhead) {//未到期, 但过封闭期
    //  let periodDay = (SpecCalTime - asset.start_time) / ms('1d');
    //  let assetDailyReturn = (asset.discountRate) * (asset.amount || asset.num) / 365 * periodDay;
    //  return assetDailyReturn;
    //}
    console.log('timeDeposit end not match any case', SpecCalTime, asset.start_time, asset.end_time);
    return 0;
  };
  /**
   * 获取预期收益
   * @param asset
   * @param 开始时间
   * @return 结束时间
   */
  expectedTimeRevenue(asset, start_time, end_time, period) {
    let revenue = {total: 0, expectlist: []}
    for (let time = start_time; time >= end_time; time += period) {
      periodRevenue = this.cal(asset, time);
      let time_value_list = {
        time: time,
        periodRevenue: periodRevenue
      };
      revenue.total += periodRevenue;
      revenue.push(time_value_list);
    }
    return revenue;
  };
}
module.exports = timeDeposit;
