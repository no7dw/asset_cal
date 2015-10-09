/**
 * Created by dengwei on 17/9/15.
 */
var should = require('should');

var Asset = require('../index').asset
var asset_cal = new Asset();
var TimeDeposit = require('../index').timeDeposit
var timeDeposit_cal = new TimeDeposit();
var ms = require('ms');
var date_util = require('../util/date_util');
var getDate = function (currentTime, day) {
    if (currentTime == undefined)
      currentTime = new Date();
    var today = new Date();
    if (day != undefined) {
      today.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + day);
    } else {
      today.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    }
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  };
var Const = {
	"PRODUCT" :{
		"KOALAID":"549922452238c54e98b750bc",
		"TIME3MID":"55c31e936f227ed922c508aa"
	}
};
var constructAsset = function(portfolioInfo, asset ) {
    //bug ToDo: mul-product not just [0], and here didn't according to time
    asset.rate = asset.rate|| portfolioInfo.rate_year;
    return asset;
  };
var constructTimeDeposit = function (portfolioInfo, asset) {

  if (asset.portfolio_id == portfolioInfo.id) {
    asset.rate = asset.rate || portfolioInfo.rate_year || portfolioInfo.rate;
    asset.start_time = date_util.formatTimeToZeroTime(asset.start_time);
    asset.end_time = asset.start_time + ms(portfolioInfo.term.toString() + 'd');
    asset.discountRate = portfolioInfo.discountRate || 0.01;
    console.log('\n\n\n@@@@  timeDeposit_cal ', portfolioInfo, asset);
    return asset;
  }
  return {};
};
var calculateSingleUserAsset = function (portfolioInfo, asset) {
    var principalAsset;
    var earning = 0;
    var compareID = (portfolioInfo.portfolio_id|| portfolioInfo.id ).toString();
    // console.log('compareID ?= Const.PRODUCT.KOALAID', compareID == Const.PRODUCT.KOALAID);
    if(asset.portfolio_id && asset.portfolio_id != Const.PRODUCT.KOALAID){
      principalAsset = constructTimeDeposit(portfolioInfo, asset);
      earning = timeDeposit_cal.cal(principalAsset);
      console.log('********** timeDeposit_cal earning',earning,  JSON.stringify(principalAsset),  JSON.stringify(portfolioInfo)  );
      return earning;
    }
    else if(asset.portfolio_id == Const.PRODUCT.KOALAID && compareID == Const.PRODUCT.KOALAID ){
      principalAsset = constructAsset(portfolioInfo, asset);
      earning = asset_cal.cal(principalAsset)
      console.log('********** DemandDepositAssetCal.cal  result：%s  asset： %s  portfolio_id %s',earning,   JSON.stringify(asset), JSON.stringify(portfolioInfo) );
      return earning;      
    }
    else{
    	console.log('*** none match');
    	// console.log('*** none match', portfolioInfo , asset, compareID);
    	return 0;
    } 
  };

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

var pokoala =  [
    {
      "amount": 1300,
      "num": 1300,
      "portfolio_id": Const.PRODUCT.KOALAID
    }
  ];
var poMul = [
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
      "start_time": getDate(new Date(), -90),
      "portfolio_id": Const.PRODUCT.TIME3MID //55c31e936f227ed922c508aa timeDeposit.id
    }
  ]

describe('asset calucaltor', function(){
	it('verify spec time 0 KOALAID', function(done){
		var earning = calculateSingleUserAsset(funds[0], pokoala[0]);
		console.log("earning", earning);
		earning.should.be.equal(0);
		done();
	})
	it('verify spec time 1 TIME3MID', function(done){
		var earning = calculateSingleUserAsset(funds[1], pokoala[0]);
		console.log("earning", earning);
		earning.should.be.above(0);
		done();
	})
	it('verify spec time 1 TIME3MID with mul', function(done){
		var earning = calculateSingleUserAsset(funds[0], poMul[1]);
		console.log("earning", earning);
		earning.should.be.above(0);
		done();
	})
	it('verify spec time 0 KOALAID with mul', function(done){
		var earning = calculateSingleUserAsset(funds[1], poMul[0]);
		console.log("earning", earning);
		earning.should.be.equal(0);
		done();
	})
	

})  