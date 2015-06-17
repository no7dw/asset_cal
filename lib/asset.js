// asset.js
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;

var mathjs = require('mathjs');
var _ = require('underscore');
var date_util = require('../util/date_util');

function Asset(){    
	EventEmitter.call(this);
	// console.log("init config");
}

inherits(Asset, EventEmitter);

Asset.prototype.cal = function(asset){
	// console.log('asset', asset);
	var isSetZeroTime = true;
	if(asset.end_time >= date_util.getDate(null, 0, isSetZeroTime))
		return 0;
	return assetDailyReturn  = asset.rate * asset.num / 365;
};

Asset.prototype.calArray = function(assetArray, cb){	
	var self = this;		
	return mathjs.sum(_.map(assetArray,self.cal))	
};

exports.Asset = Asset;