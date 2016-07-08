'use strict'

/**
 * Created by dengwei on 11/10/15.
 */
const Const = require('../data/const');
const ms = require('ms');
const date_util = require('../util/date_util');
const _ = require('underscore');

const printNotice = function () {
  const lines = [
    '\n================',
    '================',
    '================',
    '================',
    '================\n',
  ];

  _.each(lines, function (line) {
    console.log(line);
  })
};

const waningStruct = function(portfolioInfo , asset){
  const asset_pid = asset.product_id || asset.portfolio_id;
  const asset_rate = asset.rate|| portfolioInfo.rate_year || portfolioInfo.rate;;
  if(!asset_pid){
    printNotice();
    console.log('asset_pid not exists', portfolioInfo , asset);
  }
  if(!asset_rate){
    printNotice();
    console.log('asset_rate not exists', portfolioInfo , asset);
  }
  if(!portfolioInfo.discountRate && asset_pid != Const.PRODUCT.KOALAID){
    printNotice();;
    console.log('missing discountRate in constructTimeDeposit');
    //throw new Error('missing discountRate in constructTimeDeposit');//can NOT throw, if no one catch , will crash
  }
};

const constructAsset = function(portfolioInfo, asset ) {
  waningStruct(portfolioInfo, asset );
  asset.rate = asset.rate|| portfolioInfo.rate_year || portfolioInfo.rate;
  return asset;
};
const constructTimeDeposit = function (portfolioInfo, asset) {

  //const asset_pid = asset.product_id || asset.portfolio_id || asset.asset_id;
  const asset_pid = asset.product_id || asset.portfolio_id;
  if (asset_pid == portfolioInfo.id) {
    waningStruct(portfolioInfo, asset );
    asset.rate = asset.rate || portfolioInfo.rate_year || portfolioInfo.rate;
    asset.start_time = date_util.formatTimeToZeroTime(asset.start_time);
    asset.end_time = asset.start_time + ms(portfolioInfo.term.toString() + 'd');
    asset.discountRate = portfolioInfo.discountRate ;
    console.log('\n\n\n@@@@  timeDeposit_cal ', portfolioInfo, asset);
    return asset;
  }
  return {};
};

module.exports = {
  assemble : function (portfolioInfo, asset) {
    const compareID = (portfolioInfo.portfolio_id|| portfolioInfo.id ).toString();
    const asset_pid = asset.product_id || asset.portfolio_id  ;
    if(asset_pid != Const.PRODUCT.KOALAID){
      return constructTimeDeposit(portfolioInfo, asset);
    }else if(asset_pid == Const.PRODUCT.KOALAID && compareID == Const.PRODUCT.KOALAID ){
      return constructAsset(portfolioInfo, asset);
    }
    else{
      console.log('*** none match');
      return {};
    }
  }
};
