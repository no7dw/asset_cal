// asset.js
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;

var mathjs = require('mathjs');
var _ = require('underscore');
var date_util = require('../util/date_util');

function Asset(rateArray){
	EventEmitter.call(this);
  //this.rateConfig = rateArray || [];
	 //console.log("init config",rateConfig);
}

inherits(Asset, EventEmitter);
/**
 * 计算单个asset收益
 * @param 单个asset
 * @return 收益
 */
Asset.prototype.cal = function(asset, time){
	console.log('asset', asset);
	var isSetZeroTime = true;
	var SpecCalTime = time || date_util.getDate(null, 0, isSetZeroTime);
	// rule is:  ( ]
	// example : ( 9  16]  10 11 12 13 14 15 16
	if(SpecCalTime < asset.end_time ||  SpecCalTime <= asset.start_time )//may undefined
	{
		console.log('$$$ time not right , may expired' , asset.end_time, SpecCalTime);
		return 0;
	}
	if(!asset.bonus_type || asset.bonus_type == 'ex_money'){
		//return assetDailyReturn  = (asset.rateYear||this.rateConfig[CalTime]) * asset.num / 365;
		assetDailyReturn  = (asset.rate) * (asset.amount|| asset.num) / 365;	
		console.log('time ok , cal now Return:',assetDailyReturn);
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
Asset.prototype.expectedTimeRevenue = function(asset, start_time, end_time, period){
	var revenue = {total:0, expectlist:[]}
	for(var time = start_time; time>=end_time; time+=period){
		periodRevenue = this.cal(asset, time);
		var time_value_list ={
			time:time,
			periodRevenue:periodRevenue
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
Asset.prototype.calArray = function(assetArray, cb){
	if(!(assetArray && assetArray.length))
		return 0
	var array = _.map(assetArray,this.cal);
	console.log('$$ array to sum', array);
	return mathjs.sum(array)
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
