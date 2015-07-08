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

Asset.prototype.cal = function(asset){
	// console.log('asset', asset);
	var isSetZeroTime = true;
	var CalTime = date_util.getDate(null, 0, isSetZeroTime);
	if(asset.end_time >= CalTime)//may undefined
		return 0;

	return assetDailyReturn  = (asset.rate||this.rateConfig[CalTime]) * asset.num / 365;


};

Asset.prototype.calArray = function(assetArray, cb){	
	var self = this;		
	return mathjs.sum(_.map(assetArray,self.cal))	
};

exports.Asset = Asset;