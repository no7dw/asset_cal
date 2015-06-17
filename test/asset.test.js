var Asset = require('../lib/asset').Asset;
var should = require('should');
var date_util = require('../util/date_util');

describe('asset calucaltor', function(){	
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
		var result = asset.calArray(arr)
		// console.log("result",result);
		result.should.be.equal(0.08*1000/365);
		done();
	});
});