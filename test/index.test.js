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

//活期
var demandDepositSample = {
  "amount" : 11135.1943252244818723,
  "product_id" : "549922452238c54e98b750bc",
  "asset_id" : "55fa7b56de3259bf06ba985e",
  "num" : 11135,
  "earning" : 236.1943252244836344
},
//定期
  timeDepositSample = {
  "amount" : 3038.5802384521985005,
  "num" : 3038,
  "product_id" : "55c31e936f227ed922c508aa",
  "asset_id" : "5602151906b18b627e809de1",
  "rebuy" : 0,
  //"start_time" : ISODate("2015-08-01T00:00:00.000Z"),
  //"end_time" : ISODate("2015-11-01T00:00:00.000Z"),
  "expect_earning" : 67.4315066615419454
},
//体验金
  bonusSample = {
    "ticket_id" : "558270b209da1ca263a3cc10",
    "bonus_id" : "558270801c760de631b45970",
    "bonus_type" : "ex_money",
    "description" : "即送%s元体验金",
    "amount" : 500,
    "asset_id" : "561b8f2caf0eef937be5fefe",
    "start_time" : 1444579200000.0000000000000000,
    "end_time" : 1445184000000.0000000000000000,
    //"time" : ISODate("2015-10-12T10:45:00.774Z")
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
  ];
var assembleObjId = function (asset, type) {

  asset.assetType = "demandDeposit";
  if (type == 'asset') {
    asset.objId = asset.asset_id || asset.portfolio_id;
    asset.type = 2;//Const.CASHFLOW_TYPE.RETURN
    if(asset.product_id && asset.product_id != Const.PRODUCT.KOALAID )
      asset.assetType = "timeDeposit";
  }
  else if (type == 'bonus') {
    asset.product_id = Const.PRODUCT.KOALAID;
    asset.objId = asset.invitee_id ? asset.ticket_id + '_' + asset.invitee_id : asset.ticket_id;
    if (asset.bonus_type == 'ex_money') {//TicketBonus.TYPE_EX_MONEY
      asset.type = 4;//Const.CASHFLOW_TYPE.EXPERIENCE_RETURN
    } else if (asset.bonus_type == 'cash') {//TicketBonus.TYPE_CASH
      asset.type = 3;//Const.CASHFLOW_TYPE.BONUS
    } else {
      asset.type = 4;//Const.CASHFLOW_TYPE.EXPERIENCE_RETURN
    }
  }
  asset.portfolio_id = asset.product_id || asset.portfolio_id;
  return asset;
};

var testAssemble = function(bonus){
  return assembleObjId(bonus, 'bonus');
};

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
  it('verify config.bonus', function(done){//活期
    var earning = calculateSingleUserAsset(funds[1], testAssemble(bonusSample));
    console.log("earning", earning);
    earning.should.be.above(0);
    done();
  })
	

})  