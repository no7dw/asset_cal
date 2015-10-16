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
//  withdrawAhead:true//封闭期后提前取出
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
    discountRate:0.03
  };
  it('verify assetZero  at right end time', function(done){
    var assetZero = {
      amount:0.00111,
      num:0,
      start_time: new Date('2015/7/12').getTime(),//1436630400000
      end_time:new Date('2015/8/11').getTime(),//1439222400000,
      blockPeriod:15,
      rate:0.1,
      discountRate:0.03
    };

    var todayZeroTime = new Date('2015/8/11').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(assetZero, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(0);
    done();
  });

  it('verify  at right end time', function(done){

    var todayZeroTime = new Date('2015/8/11').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(asset.rate*asset.amount/365*periodDay);
    done();
  });
  it('verify after right end time', function(done){

    var todayZeroTime = new Date('2015/8/11').getTime() + ms('1d');
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(0);
    done();
  });

  it('verify before block time', function(done){

    var todayZeroTime = new Date('2015/7/26').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (asset.end_time - asset.start_time)/ms('1d');
    assetValue.should.be.equal(0);
    done();
  });
  //no need now
  //it.skip('verify at block time then withdraw', function(done){
  //  asset.withdrawAhead = true;
  //  var todayZeroTime = new Date('2015/7/27').getTime();
  //  var timeDeposit = new TimeDeposit();
  //  var assetValue = timeDeposit.cal(asset, todayZeroTime);
  //  var periodDay =  (todayZeroTime- asset.start_time)/ms('1d');
  //  assetValue.should.be.equal(asset.discountRate*asset.amount/365*periodDay);
  //  done();
  //});
  //it.skip('verify after block time before end time  then withdraw', function(done){
  //  asset.withdrawAhead = true;
  //  var todayZeroTime = new Date('2015/7/30').getTime();
  //  var timeDeposit = new TimeDeposit();
  //  var assetValue = timeDeposit.cal(asset, todayZeroTime);
  //  var periodDay =  (todayZeroTime- asset.start_time)/ms('1d');
  //  assetValue.should.be.equal(asset.discountRate*asset.amount/365*periodDay);
  //  done();
  //});
  //it.skip('verify after block time before end time  ,no withdraw', function(done){
  //  asset.withdrawAhead = false;
  //  var todayZeroTime = new Date('2015/7/30').getTime();
  //  var timeDeposit = new TimeDeposit();
  //  var assetValue = timeDeposit.cal(asset, todayZeroTime);
  //  var periodDay =  (todayZeroTime- asset.start_time)/ms('1d');
  //  assetValue.should.be.equal(0);
  //  done();
  //});
  it('verify object type of start time', function(done){
    var asset = { amount: 150,
      num: 150,
      product_id: '55c31e936f227ed922c508aa',
      asset_id: '56165b658b358add3930cc12',
      start_time: 'Fri Oct 09 2015 20:02:45 GMT+0800 (CST)',
      end_time: 'Thu Jan 07 2016 00:00:00 GMT+0800 (CST)',
      rebuy: 0,
      expect_earning: 0,
      objId: '56165b658b358add3930cc12',
      type: 2,
      portfolio_id: '55c31e936f227ed922c508aa',
      rate:0.08
    };
    var todayZeroTime = new Date('2016/01/07').getTime();
    var timeDeposit = new TimeDeposit();
    var assetValue = timeDeposit.cal(asset, todayZeroTime);
    var periodDay =  (todayZeroTime- asset.start_time)/ms('1d');
    assetValue.should.be.above(0);
    done();
  });


})