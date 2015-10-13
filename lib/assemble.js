/**
 * Created by dengwei on 11/10/15.
 */
var Const = require('../data/const');
var ms = require('ms');
var date_util = require('../util/date_util');
var _ = require('underscore');

var printNotice = function () {
  var lines = [
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

var waningStruct = function(portfolioInfo , asset){
  var asset_pid = asset.product_id || asset.portfolio_id;
  var asset_rate = asset.rate|| portfolioInfo.rate_year || portfolioInfo.rate;;
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

var constructAsset = function(portfolioInfo, asset ) {
  waningStruct(portfolioInfo, asset );
  asset.rate = asset.rate|| portfolioInfo.rate_year || portfolioInfo.rate;
  return asset;
};
var constructTimeDeposit = function (portfolioInfo, asset) {

  //var asset_pid = asset.product_id || asset.portfolio_id || asset.asset_id;
  var asset_pid = asset.product_id || asset.portfolio_id;
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
    var compareID = (portfolioInfo.portfolio_id|| portfolioInfo.id ).toString();
    var asset_pid = asset.product_id || asset.portfolio_id  ;
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
