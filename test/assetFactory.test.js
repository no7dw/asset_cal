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
  it('定期预期收益', function(done){
    var portfolioInfo = { _id: "55c31e936f227ed922c508aa",
      quota: 80000,
      name: '三月定期',
      term: 3,
      blockPeriod : 2,
      type: 1,
      isRecommend: true,
      rate: 0.09,
      discountRate: 0.03,
      product_id: "55c31e936f227ed922c508aa",
      id: '55c31e936f227ed922c508aa' };
    var asset =  { amount: 100,
      num: 100,
      product_id: '55c31e936f227ed922c508aa',
      asset_id: '561ca71fea874bf61a7e8350',
      start_time: 1444665600000,
      end_time: 1444924800000,
      rebuy: 0,
      expect_earning: 0,
      assetType: 'timeDeposit',
      objId: '561ca71fea874bf61a7e8350',
      type: 2,
      portfolio_id: '55c31e936f227ed922c508aa',
      rate: 0.09,
      discountRate: 0.03 };

    var SpecCalTime = asset.start_time + ms( portfolioInfo.term+'d');
    var principalAsset = af.assemble(portfolioInfo, asset);
    var earning = af.cal(principalAsset, SpecCalTime);
    earning.should.be.above(0);
    done();
  })
});