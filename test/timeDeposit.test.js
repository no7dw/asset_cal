/**
 * Created by dengwei on 12/8/15.
 */
var TimeDeposit = require('../lib/timeDeposit').timeDeposit;
var should = require('should');
var date_util = require('../util/date_util');
var ms = require('ms');
//
//var asset =
//{
//  id:"1",
//  startTime:140000,
//  endTime:141000,
//  blockPeriod:30,
//  amount:100000,
//  rate:0.9,
//  discountRate: 0.3,
//
//}
describe('timeDesposit calucaltor', function() {
  var asset = {
    amount:10000,
    num:10000,
    start_time: new Date('2015/7/12').getTime(),//1436630400000
    end_time:new Date('2015/8/11').getTime(),//1439222400000,
    blockPeriod:15,
    rate:0.1,
    discountRate:0.3
  };

  it('verify  with right time', function(done){

    var todayZeroTime = new Date('2015/8/11').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(asset.rate*asset.amount/365*periodDay);
    done();
  });
  it('verify  with before block time', function(done){

    var todayZeroTime = new Date('2015/7/26').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(0);
    done();
  });
  it('verify  with at block time', function(done){

    var todayZeroTime = new Date('2015/7/27').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (todayZeroTime- asset.start_time)/ms('1d');
    assetValue.should.be.equal(asset.discountRate*asset.amount/365*periodDay);
    done();
  });
})