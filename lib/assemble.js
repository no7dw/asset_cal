/**
 * Created by dengwei on 11/10/15.
 */
var Const = require('../data/const');
var ms = require('ms');
var date_util = require('../util/date_util');

var constructAsset = function(portfolioInfo, asset ) {
  asset.rate = asset.rate|| portfolioInfo.rate_year || portfolioInfo.rate;
  return asset;
};
var constructTimeDeposit = function (portfolioInfo, asset) {

  if (asset.portfolio_id == portfolioInfo.id) {
    asset.rate = asset.rate || portfolioInfo.rate_year || portfolioInfo.rate;
    asset.start_time = date_util.formatTimeToZeroTime(asset.start_time);
    asset.end_time = asset.start_time + ms(portfolioInfo.term.toString() + 'd');
    asset.discountRate = portfolioInfo.discountRate || 0.01;
    console.log('\n\n\n@@@@  timeDeposit_cal ', portfolioInfo, asset);
    return asset;
  }
  return {};
};

module.exports = {
  assemble : function (portfolioInfo, asset) {
    var compareID = (portfolioInfo.portfolio_id|| portfolioInfo.id ).toString();
    if(asset.portfolio_id && asset.portfolio_id != Const.PRODUCT.KOALAID){
      return constructTimeDeposit(portfolioInfo, asset);
    }else if(asset.portfolio_id == Const.PRODUCT.KOALAID && compareID == Const.PRODUCT.KOALAID ){
      return constructAsset(portfolioInfo, asset);
    }
    else{
      console.log('*** none match');
      return {};
    }
  }
};
