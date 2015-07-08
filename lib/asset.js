// asset.js
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;

var mathjs = require('mathjs');
var _ = require('underscore');
var date_util = require('../util/date_util');

function Asset(rateArray){
	EventEmitter.call(this);
  this.rateConfig = rateArray;
	 console.log("init config",rateConfig);
}

inherits(Asset, EventEmitter);
/**
 * 计算单个asset收益
 * @param 单个asset
 * @return 收益
 */
Asset.prototype.cal = function(asset){
	// console.log('asset', asset);
	var isSetZeroTime = true;
	var CalTime = date_util.getDate(null, 0, isSetZeroTime);
	if(asset.end_time >= CalTime)//may undefined
		return 0;

	return assetDailyReturn  = (asset.rate||this.rateConfig[CalTime]) * asset.num / 365;

};
/**
 * 计算收益
 * @param 产品数组
 * @param cb
 * @return
 */
Asset.prototype.calArray = function(assetArray, cb){
	return mathjs.sum(_.map(assetArray,this.cal))
};
/**
 * 获取所有预期收益
 * @param 产品数组
 * @param cb
 * @return
 */
Asset.prototype.getAllProfit = function(assetArray, cb){
	return _.map(assetArray,this.cal) //need cal according time
};

exports.Asset = Asset;