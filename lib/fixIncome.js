'use strict'

/**
 * Created by dengwei on 9/10/15.
 */
class FixIncome {

  constructor(){
    console.log('constructor of FixIncome');
  }

  check(asset){
    if(typeof asset != 'object')
      return -1
    if(asset.amount<1)//份额小于1 不计算
      return -1
    if (!asset.rate)
      return -1
  }

  cal(asset, time) {
  }

  expectedTimeRevenue(asset){
  }
}

module.exports = FixIncome;