/**
 * Created by dengwei on 11/10/15.
 */
var AssetFactory = require('../lib/assetFactory');
var af = new AssetFactory();
var should = require('should');

describe('asset factory calucaltor', function() {

  var Const = {
    "PRODUCT": {
      "KOALAID": "549922452238c54e98b750bc",
      "TIME3MID": "55c31e936f227ed922c508aa"
    }
  };
  var assetobj = {
    "rate": 0.08,
    "id": 0,
    "amount": 1000,
    "num": 1000,
    "portfolio_id": Const.PRODUCT.KOALAID,
    "type": "demandDeposit"
  };
  it('with normal obj', function (done) {
    //usage:
    //var af = require('./lib/assetFactory')
    //var b = new af({rate:0.01})
    //or

    //var c = b._createAsset({assetType:"demandDeposit"});
    //c.cal(asset);

    //or just like this:
    var earningValue = af.cal(assetobj);
    earningValue.should.be.equal(assetobj.amount*assetobj.rate/365);
    done();
  });
  it('with cal 0 ', function (done) {
    var earningValue = af.cal(0);
    earningValue.should.be.equal(0);
    done();
  });
});