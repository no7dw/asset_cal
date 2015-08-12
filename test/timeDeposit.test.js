/**
 * Created by dengwei on 12/8/15.
 */
var TimeDeposit = require('../lib/timeDeposit').timeDeposit;
var should = require('should');
var date_util = require('../util/date_util');
var ms = require('ms');

describe('timeDesposit calucaltor', function() {

  it('verify  with right time', function(done){
    var asset = {
      amount:10000,
      num:10000,
      start_time:1436630400000,
      end_time:1439308800000,
      blockPeriod:15,
      rate:0.1
    };

    var todayZeroTime = new Date('2015/8/12').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(asset.rate*asset.amount/365*periodDay);
    done();
  });
  it('verify  with before time', function(done){
    var asset = {
      amount:10000,
      num:10000,
      start_time:1436630400000,
      end_time:1439308700000,
      blockPeriod:15,
      rate:0.1
    };

    var todayZeroTime = new Date('2015/8/12').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(0);
    done();
  });
})