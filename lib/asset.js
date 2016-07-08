'use strict'

const mathjs = require('mathjs');
const _ = require('underscore');
const date_util = require('../util/date_util');
const FixIncome = require('./fixIncome');

class Asset {
  constructor(){
    console.log('asset constructor')
  }
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

    console.log('asset', asset);
    let isSetZeroTime = true;
    let SpecCalTime = time || date_util.getDate(null, 0, isSetZeroTime);
    if (!asset.rate)
      return 0;
    // rule is:  ( ]
    // example : ( 9  16]  10 11 12 13 14 15 16
    let verifyOutOfDate = true;
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
      let assetDailyReturn = (asset.rate) * (asset.num || asset.amount) / 365;
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
  expectedTimeRevenue(asset, start_time, end_time, period) {
    let revenue = {total: 0, expectlist: []}
    for (let time = start_time; time >= end_time; time += period) {
      periodRevenue = this.cal(asset, time);
      let time_value_list = {
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
  calArray(assetArray, cb) {
    if (!(assetArray && assetArray.length))
      return 0;
    let self = this;
    let array = _.map(assetArray, function (item, index) {
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
  getAllProfit(assetArray, cb) {
    return _.map(assetArray, this.cal) //need cal according time
  };
}

module.exports = Asset;
