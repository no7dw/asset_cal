/**
 * Created by dengwei on 10/10/15.
 */
var asset = require('./asset').Asset;
var timeDeposit = require('./timeDeposit').timeDeposit;
var bonus = require('./asset').bonus;


function AssetFactory(){

};
AssetFactory.prototype.assetClass = 'asset';

AssetFactory.prototype.createAsset = function(assetOptions){
  if( 'demandDeposit' ==  assetOptions.assetType )
    this.assetClass = asset;
  else if( 'timeDeposit' ==  assetOptions.assetType )
    this.assetClass = timeDeposit;
  else if( 'bonus' ==  assetOptions.assetType )
    this.assetClass = bonus;

  return new this.assetClass(assetOptions);

};
module.exports = AssetFactory;

//usage:
//var af = require('./lib/assetFactory')
//var b = new af({rate:0.01})
//or
//var b = new AssetFactory({rate:0.01})
//var c = b.createAsset({assetType:"demandDeposit"});
//console.log(c);
//var Const = {
//  "PRODUCT" :{
//    "KOALAID":"549922452238c54e98b750bc",
//    "TIME3MID":"55c31e936f227ed922c508aa"
//  }
//};
//var asset = {
//  "rate":0.08,
//  "id":0,
//  "amount": 1000,
//  "num": 1000,
//  "portfolio_id": Const.PRODUCT.KOALAID
//};
//c.cal(asset);
