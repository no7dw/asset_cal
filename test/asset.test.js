'use strict'

const Asset = require('../lib/asset');
const should = require('should');
const date_util = require('../util/date_util');
const ms = require('ms');

describe('asset calucaltor', function(){
	it('verify spec time', function(done){
		let asset = new Asset('');
		let assetObj = {
			"rate":0.08,
			"num":10000,
			"start_time" : 1437667200000,
			"end_time" : 1438272000000
		};
		assetObj.end_time = new Date().getTime() + ms('3d');// time ok
		let result = asset.cal(assetObj);
		result.should.be.equal(assetObj.rate*assetObj.num/365);
		done();
	});
	it('verify array without time', function(done){	
		let asset = new Asset('');

		let arr = [{
			rate : 0.08,
			num : 1000
		},{
			rate : 0.08,
			num : 500
		}
		];
		let result = asset.calArray(arr)
		// console.log("result",result);
		result.should.be.equal(0.3287671232876712);
		done();
	});
	it('verify array with time of demandDeposit', function(done){
		let asset = new Asset('');
		let isSetZeroTime = true;
		let arr = [{
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

		// asset.on('custom_event',  function(result){
		// 	console.log('event result', result);
		// })

		let result = asset.calArray(arr);
		console.log('## result', result);
		result.should.be.equal(arr[1].rate*arr[1].num/365 + arr[0].rate*arr[0].num/365);
		done();
		
	});
	it('verify array with time of ex_money', function(done){
		let asset = new Asset('');
		let isSetZeroTime = true;
		let arr = [{
			rate : 0.08,
			num : 1000,
			type:4,//ex_money
			start_time:new Date('2015-06-09').getTime(),
			end_time:new Date('2015-06-16').getTime()//out of date
		},{
			rate : 0.08,
			num : 500,
			type:4,//ex_money
			start_time:date_util.getDate(null, -3, isSetZeroTime),
			end_time:date_util.getDate(null, +10, isSetZeroTime)
		}
		];
		// asset.on('custom_event',  function(result){
		// 	console.log('event result', result);
		// })
		let result = asset.calArray(arr);
		console.log('## result', result);
		result.should.be.equal(arr[1].rate*arr[1].num/365);
		done();

	});
});