/**
 * Created by dengwei on 17/9/15.
 */
var should = require('should');

var AssetFactory = require('../lib/assetFactory');
var af = new AssetFactory();
var date_util = require('../util/date_util');

var Const = require('../data/const');

var calculateSingleUserAsset = function (portfolioInfo, asset) {
    var principalAsset = af.assemble(portfolioInfo, asset);
    return af.cal(principalAsset);
}


var funds = [ { quota: 10000,
    name: '三月定期',
    term: 90,
    type: 1,
    isRecommend: true,
    rate: 0.09,
    minQuota: 100,
    blockPeriod: 30,
    price: 1,
    calComType: 0,
    createdAt: '2015-09-18T12:52:00.277Z',
    updatedAt: '2015-09-18T12:52:00.277Z',
    discountRate: 0.01,
    id: '55c31e936f227ed922c508aa' },
  { portfolio_id: '549922452238c54e98b750bc',
    t_provide_num: 2000000,
    a_provide_num: 2000000,
    add_provide_num: 0,
    back_num: 10,
    quota: 10000,
    rate_year: 0.0862,
    ten_thousand_gain: 2.3616438356164,
    time: 1442419200000,
    createdAt: '2015-09-18T12:52:00.715Z',
    updatedAt: '2015-09-18T12:52:00.715Z',
    id: '55fc08f09c2512f2db4c70f4' } ];

var portfolioKoala =  [
    {
      "amount": 1300,
      "num": 1300,
      "portfolio_id": Const.PRODUCT.KOALAID
    }
  ];
var portfolioMul = [
    {
      "id":0,
      "amount": 0,
      "num": 0,
      "portfolio_id": Const.PRODUCT.KOALAID
    },
    {
      "id":1,
      "amount": 1000,
      "num": 1000,
      "start_time": date_util.getDate(new Date(), -90),
      "portfolio_id": Const.PRODUCT.TIME3MID //55c31e936f227ed922c508aa timeDeposit.id
    }
  ]

describe('asset calucaltor', function(){
	it('verify 错误的portfolio asset pair', function(done){
		var earning = calculateSingleUserAsset(funds[0], portfolioKoala[0]);
		console.log("earning", earning);
		earning.should.be.equal(0);
		done();
	})
	it('verify spec time 1 TIME3MID', function(done){
		var earning = calculateSingleUserAsset(funds[1], portfolioKoala[0]);
		console.log("earning", earning);
		earning.should.be.above(0);
		done();
	})
	it('verify spec time 1 TIME3MID with mul', function(done){
		var earning = calculateSingleUserAsset(funds[0], portfolioMul[1]);
		console.log("earning", earning);
		earning.should.be.above(0);
		done();
	})
	it('verify spec time 0 KOALAID with mul', function(done){
		var earning = calculateSingleUserAsset(funds[1], portfolioMul[0]);
		console.log("earning", earning);
		earning.should.be.equal(0);
		done();
	})
	

})  