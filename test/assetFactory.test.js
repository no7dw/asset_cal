/**
 * Created by dengwei on 11/10/15.
 */
var AssetFactory = require('../lib/assetFactory');
var af = new AssetFactory();

var should = require('should');
var ms = require('ms');

var date_util = require('../util/date_util');

describe('asset factory calucaltor', function() {

  var Const = {
    "PRODUCT": {
      "KOALAID": "549922452238c54e98b750bc",
      "TIME3MID": "55c31e936f227ed922c508aa"
    }
  };
  var demandDepositObj = {
    "rate": 0.08,
    "id": 0,
    "amount": 1000,
    "num": 1000,
    "portfolio_id": Const.PRODUCT.KOALAID,
    "assetType": "demandDeposit"
  };
  var timeDepositObj = {
    "id": 0,
    "amount": 1000,
    "num": 1000,
    start_time: date_util.getDate() - ms('90d'),//1436630400000
    end_time: date_util.getDate(),//1439222400000,
    blockPeriod:15,
    rate:0.1,
    discountRate:0.03,
    "portfolio_id": Const.PRODUCT.TIME3MID,
    "assetType": "timeDeposit"
  };
  it('with normal demandDeposit obj', function (done) {
    var earningValue = af.cal(demandDepositObj);
    earningValue.should.be.equal(demandDepositObj.amount*demandDepositObj.rate/365);
    done();
  });
  it('with normal timeDeposit obj', function (done) {
    var earningValue = af.cal(timeDepositObj);
    earningValue.should.be.equal(timeDepositObj.amount*timeDepositObj.rate/365*90);
    done();
  });
  it('with cal 0 ', function (done) {
    var earningValue = af.cal(0);
    earningValue.should.be.equal(0);
    done();
  });
});