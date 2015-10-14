var Asset = require('../lib/asset').Asset;
var should = require('should');
var date_util = require('../util/date_util');
var ms = require('ms');

describe('asset calucaltor', function(){

	it('verify spec time with eror', function(done){
		var asset = new Asset('');
		var assetObj = {
			"num":10000,
			"start_time" : 1437667200000,
			"end_time" : 1438272000000
		};
		assetObj.end_time = new Date().getTime() + ms('3d');// time ok
		var result = asset.cal(assetObj);
		result.should.be.equal(assetObj.rate*assetObj.num/365);
		done();
	});

	it('verify spec time', function(done){
		var asset = new Asset('');
		var assetObj = {
			"rate":0.08,
			"num":10000,
			"start_time" : 1437667200000,
			"end_time" : 1438272000000
		};
		assetObj.end_time = new Date().getTime() + ms('3d');// time ok
		var result = asset.cal(assetObj);
		result.should.be.equal(assetObj.rate*assetObj.num/365);
		done();
	});
	it('verify array without time', function(done){	
		var asset = new Asset('');

		var arr = [{
			rate : 0.08,
			num : 1000
		},{
			rate : 0.08,
			num : 500
		}
		];
		var result = asset.calArray(arr)
		// console.log("result",result);
		result.should.be.equal(0.3287671232876712);
		done();
	});
	it('verify array with time', function(done){
		var asset = new Asset('');
		var isSetZeroTime = true;
		var arr = [{
			rate : 0.08,
			num : 1000,
			start_time:new Date('2015-06-09').getTime(),
			end_time:new Date('2015-06-16').getTime()//out of date
		},{
			rate : 0.08,
			num : 500,
			start_time:date_util.getDate(null, -3, isSetZeroTime),
			end_time:date_util.getDate(null, +10, isSetZeroTime)
		}
		];

		asset.on('custom_event',  function(result){
			console.log('event result', result);
		})
		// var listener = asset.on('custom_event', function(err){
		// 	console.log('on listener' , err);
		// });
		// var listener = asset.emit('custom_event', 'time not set in emit');
		// console.log("listener:",listener);

		var result = asset.calArray(arr);
		console.log('## result', result);
		result.should.be.equal(arr[1].rate*arr[1].num/365);
		done();
		
	});
});